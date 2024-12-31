from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def home():
    return "Merhaba, dünya!"

@app.route('/get_cookies', methods=['POST'])
def get_cookies():
    # JSON verisinden URL'yi alıyoruz
    url = request.json.get('url')
    if not url:
        return jsonify({"error": "URL sağlanmalı!"}), 400

    # URL'ye istek gönderiyoruz ve çerezleri alıyoruz
    try:
        # URL'ye GET isteği gönderiyoruz
        response = requests.get(url)
        # Çerezleri alıyoruz
        cookies = response.cookies.get_dict()

        # Çerezleri filtreliyoruz
        filtered_cookies = filter_cookies(cookies)

        return jsonify({"cookies": filtered_cookies})

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"İstek hatası: {str(e)}"}), 500


def filter_cookies(cookies):
    """
    Çerezleri engellemek için bir filtreleme fonksiyonu.
    (Örnek olarak sadece belirli bir domaini engelliyoruz.)
    """
    forbidden_domains = ['example.com', 'trackersite.com']  # Zararlı olarak kabul edilen domainler
    filtered = {key: value for key, value in cookies.items() if not any(domain in key for domain in forbidden_domains)}
    return filtered

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
