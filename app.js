'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/', (req, res) => {
    console.log('REQUSST', req.body);

    if(req.body.queryResult && req.body.queryResult.action == "getLeagueTeam"){
      console.log('FEDDY ', JSON.stringify(req.body));
      let params = req.body.queryResult.parameters;
      let userStorage = req.body.originalDetectIntentRequest.payload.user.userStorage ? JSON.parse(req.body.originalDetectIntentRequest.payload.user.userStorage) : {};
      userStorage.leagueTeam = params.leagueTeam;
      console.log('STORAGE', userStorage);
      return res.json({
          "payload": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": "Its Oh Great. Nice to know that you like "+ params.leagueTeam
                    }
                  }
                ],
                "suggestions": [
                  {
                    "title": "PremierLeague"
                  },
                  {
                    "title": "FA Cup"
                  },
                  {
                    "title": "Champions League"
                  }
                ]
              },
              "userStorage": JSON.stringify(userStorage)
            }
        }
      });

    } else if(req.body.queryResult && req.body.queryResult.action == "getCountryTeamName"){
      console.log('FEDERER ', JSON.stringify(req.body));
      let params = req.body.queryResult.parameters;
      let userStorage = req.body.originalDetectIntentRequest.payload.user.userStorage ? JSON.parse(req.body.originalDetectIntentRequest.payload.user.userStorage) : {};
      userStorage.countryName = params.countryName;
      console.log('STORAGE', userStorage);
      return res.json({
        "payload": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": params.countryName + " will surely do it."
                  },
                  "basicCard":{
                    "title": "Title",
                    "subtitle": "Sub title",
                    "formattedText": "Okay ?",
                    "image": {
                      "url": "https://images.pexels.com/photos/257840/pexels-photo-257840.jpeg?auto=compress&cs=tinysrgb&h=350",
                      "accessibilityText": "ACCESS"
                      // "height": number,
                      // "width": number
                    },
                    "buttons": [{
                      "title": "Submit",
                      "openUrlAction":"http://www.facebook.com"
                      }
                    ]
                  }
                }
              ]
            },
            "userStorage": JSON.stringify(userStorage)
          }
        }
      });
    } else if(req.body.queryResult && req.body.queryResult.action == "bookTicket"){
        console.log('UNIQLO FEDERER ', JSON.stringify(req.body));
        let params = req.body.queryResult.parameters;
        let userStorage = req.body.originalDetectIntentRequest.payload.user.userStorage ? JSON.parse(req.body.originalDetectIntentRequest.payload.user.userStorage) : {};
        userStorage.homeTeam = params.homeTeam;
        userStorage.awayTeam = params.awayTeam;
        console.log('STORAGE', userStorage);
        return res.json({
          "payload": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": userStorage.homeTeam + " vs " + userStorage.awayTeam
                    }
                  }
                ]
              },
              "systemIntent": {
                "intent": "actions.intent.OPTION",
                "data": {
                  "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                  "carouselSelect": {
                    "items": [
                      {
                        "optionInfo": {
                          "key": "first title"
                        },
                        "description": "first description",
                        "image": {
                          "url": "https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png",
                          "accessibilityText": "first alt"
                        },
                        "title": "first title"
                      },
                      {
                        "optionInfo": {
                          "key": "second"
                        },
                        "description": "second description",
                        "image": {
                          "url": "https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw",
                          "accessibilityText": "second alt"
                        },
                        "title": "second title"
                      }
                    ]
                  }
                }
              },
              "userStorage": JSON.stringify(userStorage)
            }
          } 
        });
    } else{
        return res.json({statusCode:200});
    }
});

app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port 3000!'));