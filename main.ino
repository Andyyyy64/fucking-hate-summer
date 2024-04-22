#include "DHT.h"
#include <LiquidCrystal.h>
#define DHT11_PIN 2

DHT dht11(DHT11_PIN, DHT11);
LiquidCrystal lcd(12,11,10,9,8,7);

void setup() {
  Serial.begin(9600);
  dht11.begin(); // initialize the sensor
  lcd.begin(16, 2);
  lcd.clear();
}

void loop() {
  // wait a few seconds between measurements.
  delay(2000);

  // read humidity
  float humi  = dht11.readHumidity();
  // read temperature as Celsius
  float tempC = dht11.readTemperature();
  // read temperature as Fahrenheit
  float tempF = dht11.readTemperature(true);

  // check if any reads failed
  if (isnan(humi) || isnan(tempC) || isnan(tempF)) {
    Serial.println("Failed to read from DHT11 sensor!");
  } else {
    lcd.clear();

    lcd.setCursor(0, 0);
    lcd.print("Temp: ");
    lcd.print(tempC);
    lcd.print("C");

    lcd.setCursor(0, 1);
    lcd.print("Humidity: ");
    lcd.print(humi);
    lcd.print("%");

    delay(15000);
  }
}
