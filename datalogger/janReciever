//Libraries
#include <SPI.h>             
#include <RF24.h>            //Allgemeine Libary für NRF24L01+
#include <AESLib.h>          //Verschlüsselungsalgorithmen

//Konstanten und Variablen

  // NRF24L01+ Pinbelegung
  RF24 radio(9,10);
  
  // Example below using pipe5 for writing
  const uint64_t pipes[2] = { 0xF0F0F0F0E1LL, 0x7365727631LL };
  
  
  //Verschlüsselungskey für AES
  uint8_t key[] = {'A',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15};


  //Übermittelte Daten eines Sensors
  struct sensorData{
    int id;
    float value;
    int unit;
    unsigned long timeId;
  };

  //Verschlüsselte Nachricht
  struct secureMessage{
    byte message [16];
  };


void setup() {
  Serial.begin(9600);  
  
  Serial.println("Reciever");

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

}

void loop() {
    
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


sensorData entschluessleData(secureMessage  message){
  sensorData data;
  aes128_dec_single(key, message.message);
  memcpy(&data, &message.message, sizeof(data)); 
  return data;
}

void ausgabeData(sensorData t_sensorData){
        Serial.print("ID: ");
        Serial.print(t_sensorData.id);
        Serial.print(" \t");
        Serial.print("Value: ");
        Serial.print(t_sensorData.value);
        Serial.print(" \t");
        Serial.print("Unit: ");
        Serial.print(t_sensorData.unit);// Get the payload
        Serial.print(" \t");
        Serial.print("TimeId: ");
        Serial.println(t_sensorData.timeId);// Get the payload 
}










