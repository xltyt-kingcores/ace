// compound assignment operators

#include <iostream>

#include \
   <iostream>

#include \
   \
   <iostream>

#include \
   \
   "iostream"

#include <boost/asio/io_service.hpp>
#include "boost/asio/io_service.hpp"

using namespace std;

int main ()
{
    int a, b=3; /* foobar */
    a = b;
    a+=2; // equivalent to a=a+2
    cout << a;
    #if VERBOSE >= 2
        prints("trace message");
    #endif
    return 0;
}

/* Print an error message and get out */
#define ABORT                             \
    do {                                  \
        print( "Abort\n" );                \
        exit(8);                          \
} while (0)                      /* Note: No semicolon */