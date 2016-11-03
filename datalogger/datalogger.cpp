#include <iostream>
#include <fstream>
#include <ctime>
using namespace std;

int main () {
    // current date/time based on current system
    time_t now = time(0);
    
    ofstream myfile;
    myfile.open ("data.temp");
    myfile << now << " Writing this to a file.\n"<< "test";
    myfile.close();
    return 0;
}
