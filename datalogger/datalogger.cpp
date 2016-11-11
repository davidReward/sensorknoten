#include <iostream>
#include <fstream>
#include <ctime>
#include <RF24/RF24.h>            //Allgemeine Libary f  r NRF24L01+
#include <cstdlib>
#include <sstream>
#include <unistd.h>

using namespace std;

//Konstanten und Variablen

  // NRF24L01+ Pinbelegung
  RF24 radio(22,0);
  
  // Example below using pipe5 for writing
  const uint64_t pipes[2] = { 0xF0F0F0F0E1LL, 0x7365727631LL };
  
    //Übermittelte Daten eines Sensors
 
    struct secureMessage{
    char message [16];
  };
  
void writeToFile (char input[16]) {
    // current date/time based on current system
    time_t now = time(0);
    // Hängt Sachen an die Datei an
    std::ofstream data("data.temp", std::ios_base::app | std::ios_base::out);
    
    data << now << " " << input <<" Writing this to a file.\n";
}  

int main() {
    printf("Reciever");

  //nRF24L01
    radio.begin();
    radio.setPayloadSize(sizeof(secureMessage));  //Groesse der gesendeten Daten
    radio.setAutoAck(1);                          //Bei Empfangen
    radio.setDataRate(RF24_250KBPS);              //250kbs
    radio.setPALevel(RF24_PA_MAX);
    radio.setChannel(90);
    radio.setRetries(15,15);
    radio.setCRCLength(RF24_CRC_16); //Cyclic redundancy check
    //Writing und Reading Pipe
    radio.openWritingPipe(pipes[1]);
    radio.openReadingPipe(0,pipes[0]);  

    radio.startListening();

    
    while(1) {
        secureMessage t_message;
        
    
        if( radio.available()){                                                                   // Variable for the received timestamp
            while (radio.available()) {                                   // While there is data ready
                radio.read( &t_message, sizeof(t_message) ); 
                writeToFile(t_message);
                }
        }   
    }
    
    
    return 0;
}






