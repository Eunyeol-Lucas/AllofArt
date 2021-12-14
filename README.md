## 디렉토리 구조
```
├─ai
│  └─style_trs : 화풍 바꿔주는 모델(style-transfer)
│  └─style_cls : 화풍 분류 모델(style classifier)
│  
├─crud : CRUD 로직
├─database : DB 커넥션 
├─endpoints : 실제 api가 구현된 곳, crud와 ai의 로직들을 조합한 엔드포인트
├─models : SQLalchemy ORM model
├─schemas : fastAPI에서 사용하는 타입체크 class들
└─tests
```

## How to use
### Docker
```
docker build -t api .
docker run -d -p 8000:5000 --name backend api:latest
```