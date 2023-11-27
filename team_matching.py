from flask import Flask, request, jsonify
import mysql.connector
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS

app2 = Flask(__name__)
CORS(app2)

# MySQL 연결 설정
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "0221",
    "database": "hello"
}

@app2.route('/api/team-matching', methods=['POST'])
def get_similar_users():
    data = request.get_json()
    user_id = data['user_id']
    user_exercise = data['user_exercise']
    num_similar_users = data['num_similar_users']
    
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Modify the query to join the "filtering" and "user_info" tables and select all fields
        cursor.execute("SELECT f.user_id, u.user_nick, u.user_sex, u.user_age, f.exercise1, f.exercise2, f.exercise3, f.date, f.time FROM filtering f JOIN user_info u ON f.user_id = u.user_id")
        rows = cursor.fetchall()

        user_data = None
        other_users_data = []

        for row in rows:
            if row[0] == user_id:
                user_data = row
            elif user_exercise in [row[4], row[5], row[6]]:
                other_users_data.append(row)

        if user_data is None:
            return jsonify({"error": f"아이디 {user_id}를 찾을 수 없습니다."})

        # user_data가 None이 아닌 경우 이후 코드 실행
        days = ["월", "화", "수", "목", "금", "토", "일"]
        times = ["이른 오전", "오전", "오후", "늦은 오후", "저녁", "밤"]
        user_vector = []
        for day in days:
            for time in times:
                if day in user_data[7] and time in user_data[8]:
                    user_vector.append(1)
                else:
                    user_vector.append(0)

        other_users_vectors = []
        for row in other_users_data:
            other_vector = []
            for day in days:
                for time in times:
                    if day in row[7] and time in row[8]:
                        other_vector.append(1)
                    else:
                        other_vector.append(0)
            other_users_vectors.append(other_vector)

        similarities = cosine_similarity([user_vector], other_users_vectors)
        similar_users_indices = np.argsort(similarities[0])[::-1]

        similar_users = []
        for i in range(min(num_similar_users, len(similar_users_indices))):
            similar_user_index = similar_users_indices[i]
            similar_user = other_users_data[similar_user_index]
            similar_user_info = similar_user[1:9]  # Includes user_nick, user_sex, user_age, and exercise fields
            similar_users.append({"user_id": similar_user[0], "info": similar_user_info})
        
        response = {
            "similar_users": []

        }

        for similar_user in similar_users:
            similar_user_info = similar_user["info"]
            similar_user_id = similar_user["user_id"]
            similar_user_dict = {
                "user_id": similar_user_id,
                "user_info": {
                    "user_nick": similar_user_info[0],
                    "user_sex": similar_user_info[1],
                    "user_age": similar_user_info[2],
                    "exercise1": similar_user_info[3],
                    "exercise2": similar_user_info[4],
                    "exercise3": similar_user_info[5],
                    "date": similar_user_info[6],
                    "time": similar_user_info[7]
                }
            }
            response["similar_users"].append(similar_user_dict)

        return jsonify(response)

    except mysql.connector.Error as err:
        return jsonify({"error": f"MySQL 오류: {err}"})

    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app2.run(port=5001)