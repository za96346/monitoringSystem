#include <WiFi.h>
#include <HTTPClient.h>
#include <SimpleDHT.h>
#include <ArduinoJson.h>

// Wi-Fi 參數
char ssid[] = "SIOU";
char password[] = "siou0722";
String token = "";
HTTPClient http;

// 函數：Wi-Fi 連線
void connectWiFi() {
    Serial.print("開始連線到無線網路SSID: ");
    Serial.println(ssid);
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(1000);
    }
    Serial.println("\nWi-Fi 連線完成");
}

// 函數：用戶登入並取得 Token
void loginAndGetToken() {
    String loginUrl = "https://monitor.workapp.tw/backendApi/entry/login";
    String loginPayload = "{\"account\":\"siou\",\"password\":\"12345\"}";

    Serial.println("開始執行登錄請求...");
    http.begin(loginUrl);
    http.addHeader("Content-Type", "application/json");

    int httpCode = http.POST(loginPayload);
    if (httpCode == HTTP_CODE_OK) {
        String response = http.getString();
        Serial.print("登錄成功，回應內容: ");
        Serial.println(response);

        // 使用 JSON 函式庫解析回應
        DynamicJsonDocument doc(1024);
        DeserializationError error = deserializeJson(doc, response);

        if (error) {
            Serial.print("JSON 解析失敗: ");
            Serial.println(error.c_str());
            return;
        }

        token = doc["data"].as<String>();
        Serial.print("提取的 Token: ");
        Serial.println(token);
    } else {
        Serial.print("登錄失敗，HTTP 回應碼: ");
        Serial.println(httpCode);
    }
    http.end();
}

// 函數：上傳資料
void uploadData(void *pvParameters) {
    int deviceId = (*pvParameters).param1;
    String payloadData = (*pvParameters).param2;

    String deviceDataUrl = "https://monitor.workapp.tw/backendApi/deviceData";

    Serial.println("開始傳送裝置數據...");
    http.begin(deviceDataUrl);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Authorization", "Bearer " + token); // 使用 Token 授權

    int httpCode = http.POST(payloadData);
    if (httpCode == HTTP_CODE_OK) {
        String deviceDataResponse = http.getString();
        Serial.print("裝置數據傳送成功，回應內容: ");
        Serial.println(deviceDataResponse);
    } else {
        Serial.print("裝置數據傳送失敗，HTTP 回應碼: ");
        Serial.println(httpCode);
    }

    http.end();
}

// 函數：處理溫濕度裝置資料
void deviceTemperature() {
    // 宣告 DHT11 感測器腳位
    int pinDHT11 = 23;
    SimpleDHT11 dht11(pinDHT11);

    // 讀取 DHT11 溫濕度資料
    byte temperature = 0;
    byte humidity = 0;
    int err = SimpleDHTErrSuccess;

    if ((err = dht11.read(&temperature, &humidity, NULL)) != SimpleDHTErrSuccess) {
        Serial.print("溫濕度讀取失敗，錯誤碼 = ");
        Serial.println(err);
        delay(1000);
        return;
    }

    Serial.print("溫濕度讀取成功: ");
    Serial.print((int)temperature);
    Serial.print(" *C, ");
    Serial.print((int)humidity);
    Serial.println(" H");

    // 宣告並定義裝置 ID
    int deviceId = 1;

    // 構建 JSON 資料作為 payload
    String payloadData = "{\"data\":{\"degree\":" + String(temperature) + ",\"humidity\":" + String(humidity) + "},\"deviceId\":" + String(deviceId) + "}";

    // 呼叫上傳資料函數
    uploadData(deviceId, payloadData);
}

void deviceUltrasound() {
    int Trig = 12; // 發出聲波腳位
    int Echo = 14; // 接收聲波腳位

    pinMode(Trig, OUTPUT);
    pinMode(Echo, INPUT);

    digitalWrite(Trig, LOW); // 先關閉
    delayMicroseconds(5);
    digitalWrite(Trig, HIGH); // 啟動超音波
    delayMicroseconds(10);
    digitalWrite(Trig, LOW); // 關閉

    float EchoTime = pulseIn(Echo, HIGH); // 計算傳回時間
    float CMValue = EchoTime / 29.4 / 2;  // 將時間轉換成距離

    Serial.print("超音波測距成功: ");
    Serial.print(CMValue);
    Serial.println(" cm");

    int deviceId = 9;
    String payloadData = "{\"data\":{\"distance\":" + String(CMValue) + "},\"deviceId\":" + String(deviceId) + "}";
    uploadData(deviceId, payloadData);
}

void setup() {
    Serial.begin(115200);

    // 連接 Wi-Fi
    connectWiFi();

    // 登錄並取得 Token
    loginAndGetToken();
}

void loop() {
    // 定時上傳溫濕度資料
    deviceTemperature();
    // 定時上傳超音波距離資料
    deviceUltrasound();
    delay(1000);
}
