import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS

app1 = Flask(__name__)
CORS(app1)

# MySQL 서버에 연결
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0221",
    database="hello"
)

cursor = conn.cursor()

# 사용자 정보를 가져오는 SQL 쿼리 작성
query = "SELECT user_id, exercise1, exercise2, exercise3, date, time, user_mbti FROM filtering"
cursor.execute(query)

user_data = []

for row in cursor.fetchall():
    user_id, exercise1, exercise2, exercise3, date, time, user_mbti = row
    
    # 'date', 'time', 'mbti' 중 하나라도 None 값이 있는 사용자를 무시
    if None not in (date, time, user_mbti):
        user_data.append({
            'user_id': user_id,
            'exercise1': exercise1,
            'exercise2': exercise2,
            'exercise3': exercise3,
            'date': date,
            'time': time,
            'user_mbti': user_mbti
        })

# MySQL 연결 종료
conn.close()

# 운동 목록
sports = [
    "축구", "풋살", "족구", "발야구", "배구", "피구", "농구", "볼링", "탁구", "야구",
    "배드민턴", "테니스", "스쿼시", "골프/스크린골프", "주짓수", "유도", "무에타이", "태권도",
    "복싱", "사이클", "인라인스케이트", "아이스스케이트", "스키", "스노보드", "보드", "등산", "러닝",
    "마라톤", "수영", "서핑", "헬스", "크로스핏", "클라이밍", "요가", "필라테스"
]

# MBTI 유형 목록
mbti_types = ["ISTJ", "ISTP", "ISFJ", "ISFP", "INTJ", "INTP", "INFJ", "INFP",
              "ESTJ", "ESTP", "ESFJ", "ESFP", "ENTJ", "ENTP", "ENFJ", "ENFP"]

# 요일 목록
weekdays = ["월", "화", "수", "목", "금", "토", "일"]

# 시간대 정의
time_slots = ["이른 오전", "오전", "오후", "늦은 오후", "저녁", "밤"]

# 시간대를 연속적인 값으로 매핑
time_mapping = {
    "이른 오전": 0.1,
    "오전": 0.5,
    "오후": 0.9,
    "늦은 오후": 1.2,
    "저녁": 1.6,
    "밤": 2.0
}

# 각 항목에 대한 가중치
weights = {
    'exercise': 0.52,
    'date': 0.21,
    'time': 0.21,
    'user_mbti': 0.05
}

tags_for_sports = {
    "축구" : ["구기", "다리", "유산소"],
    "풋살" : ["구기", "다리", "유산소"],
    "족구" : ["구기", "다리", "네트"],
    "발야구" : ["구기", "다리"],
    "배구" : ["구기", "상체", "네트"],
    "피구" : ["구기", "상체"],
    "농구" : ["구기", "상체", "다리", "유산소"],
    "볼링" : ["구기", "실내", "레저"],
    "탁구" : ["구기", "실내", "네트", "라켓"],
    "야구" : ["구기", "상체", "다리", "라켓"],
    "배드민턴" : ["구기", "네트", "라켓"],
    "테니스" : ["구기", "상체", "다리", "네트", "라켓"] ,
    "스쿼시" : ["구기", "상체", "다리", "라켓"],
    "골프/스크린골프" : ["라켓", "레저"],
    "주짓수" : ["무술", "실내", "그라운드"],
    "유도" : ["무술", "실내", "그라운드"],
    "무에타이" : ["무술", "실내", "스탠딩", "다리"],
    "태권도" : ["무술", "실내", "스탠딩", "다리"],
    "복싱" : ["무술", "실내", "스탠딩", "상체"],
    "사이클" : ["하계", "라이딩", "유산소", "다리"],
    "인라인스케이트" : ["하계", "라이딩", "다리", "레저"],
    "아이스스케이트" : ["동계", "라이딩", "다리", "레저", "실내"],
    "스키" : ["동계", "라이딩", "다리"],
    "스노보드" : ["동계", "라이딩", "다리"],
    "보드" : ["하계", "라이딩", "다리"],
    "등산" : ["다리", "유산소"],
    "러닝" : ["다리", "유산소"],
    "마라톤" : ["다리", "유산소"],
    "수영" : ["하계", "수중", "실내", "유산소"],
    "서핑" : ["하계", "수중", "레저"],
    "헬스" : ["실내", "근력"],
    "크로스핏" : ["실내", "근력", "유산소"],
    "클라이밍" : ["실내", "상체", "근력"],
    "요가" : ["실내", "유산소"],
    "필라테스" : ["실내", "유산소"]
}

tags_for_mbti = {
    "ISTJ" : ["내향적", "감각적", "사고적", "계획적"],
    "ISFJ" : ["내향적", "감각적", "감정적", "계획적"],
    "ISTP" : ["내향적", "감각적", "사고적", "즉흥적"],
    "ISFP" : ["내향적", "감각적", "감정적", "즉흥적"],
    "INTJ" : ["내향적", "직관적", "사고적", "계획적"],
    "INFJ" : ["내향적", "직관적", "감정적", "계획적"],
    "INTP" : ["내향적", "직관적", "사고적", "즉흥적"],
    "INFP" : ["내향적", "직관적", "감정적", "즉흥적"],
    "ESTJ" : ["외향적", "감각적", "사고적", "계획적"],
    "ESFJ" : ["외향적", "감각적", "감정적", "계획적"],
    "ESTP" : ["외향적", "감각적", "사고적", "즉흥적"],
    "ESFP" : ["외향적", "감각적", "감정적", "즉흥적"],
    "ENTJ" : ["외향적", "직관적", "사고적", "계획적"],
    "ENFJ" : ["외향적", "직관적", "감정적", "계획적"],
    "ENTP" : ["외향적", "직관적", "사고적", "즉흥적"],
    "ENFP" : ["외향적", "직관적", "감정적", "즉흥적"],
}

# 운동 원-핫 인코딩
def encode_sports_with_tags(sports, sport_tags):
    unique_tags = list(set(tag for tags in sport_tags for tag in tags))
    sport_encodings = {}
    
    for sport, tags in zip(sports, sport_tags):
        one_hot_encoding = np.zeros(len(sports) + len(unique_tags), dtype=int)
        
        # 운동 원-핫 인코딩 부분
        sport_index = sports.index(sport)
        one_hot_encoding[sport_index] = 1
        
        # 태그 원-핫 인코딩 부분
        for tag in tags:
            tag_index = unique_tags.index(tag)
            one_hot_encoding[len(sports) + tag_index] = 1
        
        sport_encodings[sport] = one_hot_encoding
        
    return sport_encodings

# MBTI 원-핫 인코딩
def encode_mbti_with_tags(mbti_types, mbti_tags):
    unique_tags = list(set(tag for tags in mbti_tags for tag in tags))
    mbti_encodings = {}
    
    for mbti_type, tags in zip(mbti_types, mbti_tags):
        one_hot_encoding = np.zeros(len(mbti_types) + len(unique_tags), dtype=int)
        
        # MBTI 유형 원-핫 인코딩 부분
        mbti_index = mbti_types.index(mbti_type)
        one_hot_encoding[mbti_index] = 1
        
        # 태그 원-핫 인코딩 부분
        for tag in tags:
            tag_index = unique_tags.index(tag)
            one_hot_encoding[len(mbti_types) + tag_index] = 1
        
        mbti_encodings[mbti_type] = one_hot_encoding
        
    return mbti_encodings


# 태그 리스트 생성
all_sport_tags = [tags_for_sports[sport] for sport in sports]
all_mbti_tags = [tags_for_mbti[mbti_type] for mbti_type in mbti_types]

# 모든 운동에 대한 태그 원-핫 인코딩 생성
sports_encodings_with_tags = encode_sports_with_tags(sports, all_sport_tags)

# 모든 MBTI 유형에 대한 태그 원-핫 인코딩 생성
mbti_encodings_with_tags = encode_mbti_with_tags(mbti_types, all_mbti_tags)

# 요일 원-핫 인코딩
def one_hot_encode_weekday(day):
    one_hot_encoding = np.zeros(len(weekdays), dtype=int)
    if day in weekdays:
        index = weekdays.index(day)
        one_hot_encoding[index] = 1
    return one_hot_encoding

# 모든 요일에 대한 원-핫 인코딩 생성
weekday_encodings = {}
for day in weekdays:
    encoding = one_hot_encode_weekday(day)
    weekday_encodings[day] = encoding
    
# 각 시간대의 고유 벡터 생성
time_vectors = {}
for slot in time_slots:
    vector = np.zeros(len(time_slots))
    vector[time_slots.index(slot)] = time_mapping[slot]
    time_vectors[slot] = vector

# 사용자 정보에서 필요한 정보 추출
def extract_user_info(user):
    exercises = [user['exercise1'], user['exercise2'], user['exercise3']]
    days = user['date'].split(', ')
    times = user['time'].split(', ')
    mbti = user['user_mbti']
    return exercises, days, times, mbti

# 운동, 요일, 시간대를 따로 유지하며 표현
def encode_user_info(exercises, days, times, mbti):
    exercise_vector = np.zeros(len(sports) + len(set(tag for tags in all_sport_tags for tag in tags)), dtype=int)
    for exercise in exercises:
        if exercise:
            exercise_vector += sports_encodings_with_tags[exercise]
    
    day_vector = sum([one_hot_encode_weekday(day) for day in days])
    time_vector = sum([time_vectors[time] for time in times if time in time_vectors])

    mbti_vector = mbti_encodings_with_tags[mbti]
    
    return exercise_vector, day_vector, time_vector, mbti_vector

@app1.route('/api/algorithm', methods=['POST'])
def matching():
    # 요청에서 사용자 정보 추출 및 처리
    input_data = request.get_json()
    input_userId = input_data.get('userId', '')

    if 'userId' in input_data:
        if input_userId in user_vectors:
            # 자기 자신을 제외하고 가장 유사한 사용자 5명 찾기
            similarities = {}
            for userId, user_data in user_vectors.items():
                if userId != input_userId:
                    weighted_similarity = 0
                    similarity_details = {}  # 각 항목별 유사도를 저장하기 위한 딕셔너리
                
                    # 각 항목별 유사도 계산
                    for feature in user_data:
                        similarity = cosine_similarity([user_vectors[input_userId][feature]], [user_data[feature]])[0][0]
                        weighted_similarity += weights[feature] * similarity
                        similarity_details[feature] = int(similarity * 100)  # 백분율로 변환
                    
                    similarities[userId] = {
                        'weighted_similarity': int(weighted_similarity * 100),  # 전체 유사도를 백분율로 변환
                        'similarity_details': similarity_details
                    }

            # 유사도에 따라 내림차순으로 정렬
            sorted_similarities = sorted(similarities.items(), key=lambda x: x[1]['weighted_similarity'], reverse=True)

            # 가장 유사한 5명 출력
            recommended_users = []
            for i, (userId, data) in enumerate(sorted_similarities[:20], start=1):
                recommended_users.append({
                    'userId': userId,
                    'weighted_similarity': data['weighted_similarity'],
                    'similarity_details': data['similarity_details']
                })

            return jsonify({'recommended_users': recommended_users})
        else:
            return jsonify({'error': '사용자를 찾을 수 없습니다.'})
    else:
        return jsonify({'error': '사용자를 찾을 수 없습니다.'})

if __name__ == '__main__':
    
    # 모든 사용자의 정보를 벡터로 변환
    user_vectors = {}
    for user in user_data:
        exercises, days, times, mbti = extract_user_info(user)
        exercise_vector, day_vectors, time_vectorss, mbti_vector = encode_user_info(exercises, days, times, mbti)
        user_vectors[user['user_id']] = {
            'exercise': exercise_vector,
            'date': day_vectors,
            'time': time_vectorss,
            'user_mbti': mbti_vector
        }
    app1.run(port=5000)