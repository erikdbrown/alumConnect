var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var moment = require('moment');
var User = require('../models/user');
var Group = require('../models/group');
var Groups = require('../collections/groups');
var Group_user = require('../models/group_user');
var Groups_users = require('../collections/groups_users');
var Groups = require('../collections/groups');
var visGroup = require('../models/visibleGroup.js');
var visGroups = require('../collections/visibleGroups.js');
var config = require('../config/githubAPIConfig.js');
var Promise = require('bluebird');
var filter = require('lodash/filter');
var uniq = require('lodash/uniq');
var request = require('superagent');
// IDs of admin priveledged groups
var adminGroups = ['1', '2'];


exports.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

exports.isAdmin = function(req, res, next) {
  
  if (req.isAuthenticated()) {
    User.where({githubid: req.user.attributes.githubid}).fetch()
      .then(function(user) {
        if(user.attributes.permission === 1) {
          next();
        } else {
          res.redirect('/');
        }
      });
  } else {
    res.redirect('/login');
  }
};

exports.filterUsers = function(usersArr, userId) {
  return new Promise(function(resolve, reject) {
    var allowedGroups = [];
    var selectedGroup;
    var filteredUsers = [];
    
    for (var i = 0; i < usersArr.length; i++) {
      if (userId === usersArr[i].id) {
        for (var group in usersArr[i].groups) {
          if (adminGroups.indexOf(group) !== -1) {
            console.log('is admin, return all')
            resolve(usersArr);
          } else {
            console.log('GROUP SELECTED')
            selectedGroup = parseInt(group);

          }
        }
        break;
      }
    }

    visGroups.model.where({ Group_id: selectedGroup }).fetchAll()
      .then(function(visGroups) {
        console.log(visGroups)
        for (var l = 0; l < visGroups.models.length; l++) {
          allowedGroups.push(visGroups.models[l].attributes.Visible_id);
        }
        // for (var j = 0; j < allowedGroups.length; j++) {
        //   Groups_users.models.where({ Group_id: allowedGroups[j] }).fetch()
        //     .then(function(gusers) {
        //       for (var m = 0; m < gusers.length; m++) {
        //         filteredUsers.push(gusers[m].User_id);
        //         if (m === gusers.length - 1) {
        //           var uniqUsers = uniq(filteredUsers);
        //           return filter(usersArr, function(item) {
        //             return uniqUsers.indexOf(item.id) !== -1;
        //           });
        //         }
        //       }
        //     });
        // }
        var filtered = filter(usersArr, function(item) {
          for (var group in item.groups) {
            if (adminGroups.indexOf(group) !== -1) {
              return true;
            } else if (allowedGroups.indexOf(parseInt(group)) !== -1) {
              return true;
            } else {
              return false;
            }
          }
        });
        console.log(filtered);
        resolve(filtered);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.filterGroups = function(groupsArr, userid) {
  return new Promise(function(resolve, reject) {
    var allowedGroups = [];
    var selectedGroup;
    var filteredUsers = [];
    
    request
      .get('localhost:3000/db/users/user/' + userid)
      .send()
      .end(function(err, res) {
        var data = res.body;
        console.log(data);
        for (var group in data.groups) {
          console.log('doing group ', group)
          if (adminGroups.indexOf(group) !== -1) {
            console.log('user is admin, giving all')
            resolve(groupsArr);
          } else {
            console.log('Not admin, assigning group');
            selectedGroup = group;
          }
        }
        console.log(selectedGroup);
        visGroups.model.where({ Group_id: selectedGroup }).fetchAll()
          .then(function(visGroups) {
            console.log(visGroups)
            for (var l = 0; l < visGroups.models.length; l++) {
              console.log(visGroups.models[l]);
              allowedGroups.push(visGroups.models[l].attributes.Visible_id);
            }
            var filtered = filter(groupsArr, function(item) {
              console.log(allowedGroups);
              console.log(item.id);
              console.log(allowedGroups.indexOf(item.id));
              return allowedGroups.indexOf(item.id) !== -1;
            });
            console.log(filtered);
            resolve(filtered);
          })
          .catch(function(err) {
            reject(err);
          });
      });
  });
};





