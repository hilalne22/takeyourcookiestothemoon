import requests

# Web sitesine bağlanma
url = "https://www.example.com"  # Örnek URL
response = requests.get(url)

# Çerezleri alma
cookies = response.cookies

# Çerezlerin güvenli olup olmadığını kontrol etme
for cookie in cookies:
    print(cookie.name, cookie.value)
    # Burada çerezin güvenli olup olmadığını kontrol edebilirsin
