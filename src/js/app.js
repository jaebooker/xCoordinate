App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('../projects.json', function(data) {
      var projectsRow = $('#projectsRow');
      var projectsTemplate = $('#projectsTemplate');

      for (i = 0; i < data.length; i ++) {
        projectsTemplate.find('.panel-title').text(data[i].name);
        projectsTemplate.find('img').attr('src', data[i].picture);
        projectsTemplate.find('.project-type').text(data[i].type);
        projectsTemplate.find('.project-date').text(data[i].date);
        projectsTemplate.find('.project-location').text(data[i].location);
        projectsTemplate.find('.btn-join').attr('data-id', data[i].id);

        projectsRow.append(projectsTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
      //Is there a web3 instance?
      if (typeof web3 !== 'underfined') {
          App.web3Provider = web3.currentProvider;
      } else {
          //is there's no web3, use Ganache
          App.web3Provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
      }
      web3 = new Web3(App.web3Provider);
      return App.initContract();
  },

  initContract: function() {
      $.getJSON('projects.json', function(data) {
          //get the contract file and instantiate it truffle
          var ProjectsArtifact = data;
          App.contracts.Projects = TruffleContract(ProjectsArtifact);
          //set provider
          App.contracts.Projects.setProvider(App.web3Provider)
          //use our contract to get and set projects
          return App.markJoin();
      });
      return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-join', App.handleJoin);
  },

  markJoin: function(projectAdopters, account) {
      var projectAdoptionInstance;
      App.contracts.Projects.deployed().then(function(instance) {
          projectAdoptionInstance = instance;

          return projectAdoptionInstance.getProjectAdopters.call();
      }).then(function(projectAdopters) {
          for (i = 0; i < projectAdopters.length; i++) {
              if (projectAdopters[i] !== '0x0000000000000000000000000000000000000000')
              $('.panel-project').eq(i).find('button').text('Success').attr('disabled', true);
          }
      }).catch(function(err) {
      console.log(err.message);
  });
  },

  handleJoin: function(event) {
    event.preventDefault();
    var projectId = parseInt($(event.target).data('id'));
    var projectAdoptionInstance;
    web3.eth.getAccounts(function(err, accounts) {
        if (err) {
            console.log(err);
        }
        var account = accounts[0];
        App.contracts.Projects.deployed().then(function(instance) {
            projectAdoptionInstance = instance;
            //use join by sending account
            return projectAdoptionInstance.joinProject(projectId, {from: account});
        }).then(function(result) {
            return App.markJoin();
        }).catch(function(err) {
            console.log(err.message);
        });
    });
}//remove paranthesis if not needed

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
