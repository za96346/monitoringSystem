#include <WiFi.h>
#include <HTTPClient.h>
#include <SimpleDHT.h>

// Wi-Fi 參數
char ssid[] = "CJF";
char password[] = "19991206";
String token = "";

// DHT11 引腳
int pinDHT11 = 23;

// 宣告 SimpleDHT11 物件
SimpleDHT11 dht11(pinDHT11);

void setup() {
  Serial.begin(115200);
  Serial.print("開始連線到無線網路SSID: ");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println("\n連線完成");

    HTTPClient http;
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
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, response);

    if (error) {
      Serial.print("JSON 解析失敗: ");
      Serial.println(error.c_str());
      return;
    }

    token = doc["token"]; // 提取 token
    Serial.print("提取的 Token: ");
    Serial.println(token);
  } else {
    Serial.print("登錄失敗，HTTP 回應碼: ");
    Serial.println(httpCode);
  }
  http.end();
  // @todo login preprocess.
  
}

void loop() {
  Serial.println("=============");

  // 讀取 DHT11 溫濕度
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


  // **第二段 curl 功能整合** - 傳送裝置數據
  String deviceDataUrl = "https://monitor.workapp.tw/backendApi/deviceData";
  String deviceDataPayload = "{\"data\":{\"degree\":14,\"age\":30},\"deviceId\":1}";

  Serial.println("開始傳送裝置數據...");
  http.begin(deviceDataUrl);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Authorization", "Bearer " + ); // 替換為正確的授權碼

  httpCode = http.POST(deviceDataPayload);
  if (httpCode == HTTP_CODE_OK) {
    String deviceDataResponse = http.getString();
    Serial.print("裝置數據傳送成功，回應內容: ");
    Serial.println(deviceDataResponse);
  } else {
    Serial.print("裝置數據傳送失敗，HTTP 回應碼: ");
    Serial.println(httpCode);
  }
  http.end();

  // 休息 20 秒

  delay(20000);
}