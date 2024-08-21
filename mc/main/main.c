#include "wifi.h"
#include "dht11.h"

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#include "esp_log.h"
#include "esp_http_client.h"

#define DHT_GPIO 4
#define POST_INTERVAL (1 * 60 * 1000) // 1 min
#define API_URL "https://fucking-hate-summer.onrender.com/data/add"

esp_err_t post_sensor_data(int temp, int humi) {
    char post_data[100];
    snprintf(post_data, sizeof(post_data), "{\"temp\": %d, \"humi\": %d}", temp, humi);
    
esp_http_client_config_t config = {
    .url = API_URL,
    .method = HTTP_METHOD_POST,
    .timeout_ms = 10000,
};

    esp_http_client_handle_t client = esp_http_client_init(&config);
    esp_http_client_set_header(client, "Content-Type", "application/json");
    esp_http_client_set_post_field(client, post_data, strlen(post_data));

    esp_err_t err = esp_http_client_perform(client);
    if (err == ESP_OK) {
        ESP_LOGI(TAG, "OK");
    } else {
        ESP_LOGI(TAG, "HTTP POST request failed: %s", esp_err_to_name(err));
    };

    esp_http_client_cleanup(client);
    return err;
}

void app_main(void) {
    esp_err_t ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ret = nvs_flash_init();
    }

    ESP_ERROR_CHECK(ret);

    wifi_init();

    DHT11_init(DHT_GPIO);
    ESP_LOGI(TAG, "DHT11 sensor initialized at GPIO %d", DHT_GPIO);

    while (1) {
        if (DHT11_read().status == DHT11_OK) {
            ESP_LOGI(TAG, "Temperature: %d°C, Humidity: %d", DHT11_read().temperature, DHT11_read().humidity);

            post_sensor_data(DHT11_read().temperature, DHT11_read().humidity);
        } else {
            ESP_LOGI(TAG, "Failed to read from DHT11 sensor");
        }

        vTaskDelay(POST_INTERVAL / portTICK_PERIOD_MS); // Delay for 1 min
    }
}