#include <cstdlib>
#include <iostream>
#include <sstream>
#include <string>
#include <unistd.h>
#include <RF24/RF24.h>

#include <ctime>
#include <fstream>

using namespace std;
RF24 radio(22,0);

/********************************/

// Radio pipe addresses for the 2 nodes to communicate.
const uint64_t pipes[2] = {0xF0F0F0F0E1LL, 0x7365727631LL};

    struct secureMessage{
    char message [16];
  };

void writeToFile (char input[16]) {
    // current date/time based on current system
    time_t now = time(0);
    // Hängt Sachen an die Datei an
    std::ofstream data("datafifo", std::ios_base::app | std::ios_base::out);
    
    data << now << " " << input << " " <<"\n";
}
  
int main(int argc, char** argv){

  cout << "\n RF24 Receiver for Studienarbeit\n";

  
  radio.begin();
  radio.setPayloadSize(sizeof(secureMessage));  //Groesse der gesendeten Daten
  radio.setAutoAck(1); 
  radio.setDataRate(RF24_250KBPS); //250kbs
  radio.setPALevel(RF24_PA_MAX);
  radio.setChannel(90);
  radio.setRetries(15,15);
  radio.setCRCLength(RF24_CRC_16);
  radio.openWritingPipe(pipes[1]);
  radio.openReadingPipe(1,pipes[0]);

  
  //radio.printDetails();



    
	
	radio.startListening();
	
	// forever loop
	while (1)
	{
        secureMessage t_message;

            if( radio.available()){                             // Variable for the received timestamp
                while (radio.available()) {                     // While there is data ready
                radio.read( &t_message, sizeof(t_message) ); 
                writeToFile(t_message.message);
                
                }
            }
    } // forever loop

  return 0;
}

                     
