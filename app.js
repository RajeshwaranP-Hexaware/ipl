'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/', (req, res) => {
    console.log('REQUSST', jSON.stringify(req.body));

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
                    },
                    "carouselBrowse":{
                      "items": [
                        {
                          "title": "Carousal",
                          "description": "description",
                          "footer": "Footer",
                          "image": {
                            "url": "https://cdn.pixabay.com/photo/2017/01/06/23/21/soap-bubble-1959327_960_720.jpg"
                          },
                          "openUrlAction": {
                            "url": "http://www.rf.com",   
                          }
                        }
                      ],
                      "imageDisplayOptions": ["WHITE"]
                    }
                  }
                ]
              },
              "userStorage": JSON.stringify(userStorage)
            }
          } 
        });
    } else if(req.body.metadata.intentName == "addNationalId"){
        let leave_details= [];
        leave_details.push({
            "optionInfo": {
                "key": `ind`,
                "synonyms": `India`
            },
            "title": `India`,
            "description": `india country`
        });
        leave_details.push({
            "optionInfo": {
                "key": `eng`,
                "synonyms": `england`
            },
            "title": `England`,
            "description": `England`
        });
        let data = {
            "speechMsg": "Test",
            "title": "Test",
            "itemValues": leave_details
        };

        return {
          "messages": [
              {
                  "displayText": data.speechMsg,
                  "platform": "google",
                  "textToSpeech": data.speechMsg,
                  "type": "simple_response"
              },  {
                  "items": data.itemValues,
                  "platform": "google",
                  "title": data.title,
                  "type": "list_card"
              }
          ]
      };
    } else if(req.body.metadata.intentName == "addNationalId-type"){
      console.log('FULL REQ IN addNationalId', JSON.stringify(req.body));
      var country, nationalIdType="", nationalId ="", comment=""
      for(var i=0;i<contexts.length;i++){
        if(contexts[i].name === "actions_intent_option"){
            console.log("HEY RAJESH", JSON.stringify(contexts[i]));
            country = contexts[i].parameters.OPTION;
            nationalIdType = contexts[i].parameters.nationalIdType;
            nationalId = contexts[i].parameters.nationalId;
            comment = contexts[i].parameters.comment;
        }
     }

     if(nationalIdType == ""){

      let leave_details= [];
      leave_details.push({
          "optionInfo": {
              "key": `pan`,
              "synonyms": `Pan`
          },
          "title": `Pan`,
          "description": `Pan Card`
      });
      leave_details.push({
          "optionInfo": {
              "key": `aadhar`,
              "synonyms": `Aadhar`
          },
          "title": `Aadhar`,
          "description": `aadhar card`
      });
      let data = {
          "speechMsg": "Test 1",
          "title": "Test 1",
          "itemValues": leave_details
      };

      return {
          "contextOut": [
              {
                  "name": "actions_intent_option",
                  "parameters": {
                    "country": country,
                    "country.original": country,
                    "nationalIdType": nationalIdType,
                    "nationalIdType.original": nationalIdType,
                    "nationalId": nationalId,
                    "nationalId.original": nationalId,
                    "comment": comment,
                    "comment.original": comment
                  },
                  "lifespan": 5
                }
          ],
        "messages": [
            {
                "displayText": data.speechMsg,
                "platform": "google",
                "textToSpeech": data.speechMsg,
                "type": "simple_response"
            },  {
                "items": data.itemValues,
                "platform": "google",
                "title": data.title,
                "type": "list_card"
            }
        ]
    };
  }
  } else{
    console.log('JEJJEJE', req.body);
  }
});

app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port 3000!'));