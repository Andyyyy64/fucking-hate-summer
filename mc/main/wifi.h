#include "esp_system.h"
#include "esp_wifi.h"
#include "esp_event.h"
#include "esp_log.h"
#include "nvs_flash.h"
#include "esp_http_client.h"

#define WIFI_CONNECTED_BIT BIT0
#define WIFI_FAIL_BIT      BIT1

static EventGroupHandle_t s_wifi_event_group;
static int s_retry_num = 0;

extern const char* WIFI_SSID;
extern const char* WIFI_PASS;

static const char* TAG = "wifi-module";

static void event_handler(void* arg, esp_event_base_t event_base, int32_t event_id, void* event_data);
void wifi_init();