#include <avr/io.h>
#include <util/delay.h>

int main() {
    DDRB = DDRB | (1 << DDB5); // set PORTB5 as output
    while(1) {
        PORTB = PORTB | (1 << PORTB5); // set PORTB5 to high
        _delay_ms(1000);
        PORTB = PORTB & ~(1 << PORTB5); // set PORTB5 to low
        _delay_ms(1000);
    }
}
