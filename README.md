This application works in 2 ways. At first, it convert data from xlsx to JSON and insert it to MongoDB. And then you can access and make changes to the database through REST APIs provided by this application

To get it running you'll need to install several dependencies by do 'npm install', then run it by 'npm start'. 

Notes : 

xlsx file must be located in folder data.

You can get insert data from xlsx to MongoDB by calling 'http://localhost:3000/xlsx/2000' for 2000 rows. If the data started from X row, then you should call 'http://localhost:3000/xlsx/200X' to get 2000 data. There will be only insert data process, the data won't be checked whether it already exist in DB.

You can change the configuration for mongoDB and xlsx file in config.json file.

you can test the API with the following commands:

    Get all data:
    curl -i -X GET http://localhost:3000/data

    Get data with _id value of 5338b9f82b5c5bf73b67fdac (use a value that exists in your database):
    curl -i -X GET http://localhost:3000/data/id/5338b9f82b5c5bf73b67fdac

    Get data with kegiatanid value of 46440 (use a value that exists in your database):
    curl -i -X GET http://localhost:3000/data/kegiatanid/46440

    Delete data with _id value of 5338b9f82b5c5bf73b67fdac:
    curl -i -X DELETE http://localhost:3000/data/id/5338b9f82b5c5bf73b67fdac

    Delete data with kegiatanid value of 46440:
    curl -i -X DELETE http://localhost:3000/data/kegiatanid/46440

    Modify data with _id value of 5338b9f82b5c5bf73b67fdac:
    curl -i -X PUT -H 'Content-Type: application/json' -d '{"unit": "00000", "skpdnama": "edited"}' http://localhost:3000/data/id/5338b9f82b5c5bf73b67fdac

    Modify data with kegiatanid value of 46440:
    curl -i -X PUT -H 'Content-Type: application/json' -d '{"unit": "00000", "skpdnama": "edited"}' http://localhost:3000/data/kegiatanid/46440

    Add a new data :
    curl -i -X POST -H 'Content-Type: application/json' -d '{
    	"unit": "0",
    	"skpdnama": "testing",
    	"urusan": "1.2",
    	"namaurusan": "testing",
    	"program": "1",
    	"namaprogram": "testing",
    	"nokegiatan": "15",
    	"namakegiatan": "Dialog Interaktif Etika Birokrasi Dalam Penyelenggaraan Pemerintahan",
    	"nilai": " 180,000,000 ",
    	"kegiatanid": "00000",
    	"skpdkode2013": "1.20.019",
    	"programkode": "1.20.01",
    	"realisasi": " 148,925,200 ",
    	"persenrealisasi": "82.74%"
    }' http://localhost:3000/data 

