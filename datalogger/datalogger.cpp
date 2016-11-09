#include <iostream>
#include <fstream>
#include <ctime>
#include <RF24/RF24.h>            //Allgemeine Libary f  r NRF24L01+
#include <cstdlib>
#include <sstream>
#include <string>
#include <unistd.h>

using namespace std;

//Konstanten und Variablen

  // NRF24L01+ Pinbelegung
  RF24 radio(22,0);
  
  // Example below using pipe5 for writing
  const uint64_t pipes[2] = { 0xF0F0F0F0E1LL, 0x7365727631LL };
  
    //Übermittelte Daten eines Sensors
  struct sensorData{
    int id;
    float value;
    int unit;
    unsigned long timeId;
  };
  
    struct secureMessage{
    byte message [16];
  };
  
  

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
        sensorData t_sensorData;
        secureMessage t_message;
        
    
        if( radio.available()){                                                                   // Variable for the received timestamp
            while (radio.available()) {                                   // While there is data ready
                radio.read( &t_message, sizeof(t_message) ); 
                t_sensorData = entschluessleData(t_message);
                ausgabeData(t_sensorData);
                }
        }   
    }
    
    
    return 0;
}

int writeToFile () {
    // current date/time based on current system
    time_t now = time(0);
    
    ofstream myfile;
    myfile.open ("data.temp");
    myfile << now << " Writing this to a file.\n"<< "test";
    myfile.close();
    return 0;
}




