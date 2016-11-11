#include <iostream>
#include <fstream>
#include <string>
using namespace std;

// Der Empfangene String soll hier in diesen String gespeichert werden.




void writeToFile (char input[16]) {
    // current date/time based on current system
    time_t now = time(0);
    // Hängt Sachen an die Datei an
    std::ofstream data("data.temp", std::ios_base::app | std::ios_base::out);
    
    data << now << " " << input <<" Writing this to a file.\n";
}  


int main () {
    //string recievedData = "Test";
    char recievedData[]="01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101"; 
    cout << recievedData << endl;
    writeToFile(recievedData);
    return 0;
}
