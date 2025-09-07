# Backend for Car Booking App

This folder will contain the FastAPI backend code.


Quy trình triển khai thường là:

1. Copy mã nguồn backend (bao gồm requirements.txt) lên EC2.
2. Tạo và kích hoạt virtualenv (nên dùng):

python3 -m venv venv
source venv/bin/activate

3. Cài đặt các thư viện cần thiết:
pip install -r requirements.txt

Chạy ứng dụng FastAPI (bằng uvicorn hoặc gunicorn).
File requirements.txt giúp đảm bảo môi trường trên EC2 có đầy đủ các thư viện mà ứng dụng của bạn cần để chạy chính xác.