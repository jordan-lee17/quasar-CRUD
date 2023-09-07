<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Simple Review Web
        </q-toolbar-title>

        <div>MongoDB</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div class="gameContainer" id="gameContainer">
        <!-- <div class="gameDisplay zoom" v-for="(game, index) in games" :key="index">
          <div>
            <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg?t=1682639497">
          </div>
        </div> -->
        <!-- <div class="gameDisplay" @click="$router.push('/gameReview/:id')">
          <div class="imgDisplay">
            <img src="../assets/dota.jpg" class="imgDisplay">      
          </div>
        </div>
        <div class="gameDisplay">
          <div class="imgDisplay">
            <img src="../assets/dota.jpg" class="imgDisplay">       
          </div>
        </div>
        <div class="gameDisplay">
          <div class="imgDisplay">
            <img src="../assets/dota.jpg" class="imgDisplay">       
          </div>
        </div>
        <div class="gameDisplay">
          <div class="imgDisplay">
            <img src="../assets/dota.jpg" class="imgDisplay">       
          </div>
        </div>
        <div class="gameDisplay">
          <div class="imgDisplay">
            <img src="../assets/dota.jpg" class="imgDisplay">       
          </div>
        </div>
        <div class="gameDisplay">
          <div class="imgDisplay">
            <img src="../assets/dota.jpg" class="imgDisplay">       
          </div>
        </div>
        <div class="gameDisplay">
          <div class="imgDisplay">
            <img src="../assets/dota.jpg" class="imgDisplay">       
          </div>
        </div>
        <div class="gameDisplay">
          <div class="imgDisplay">
            <img src="../assets/dota.jpg" class="imgDisplay">       
          </div>
        </div> -->
      </div>

    </q-page-container>
  </q-layout>
</template>


<script>
import axios from 'axios' 
import $ from 'jquery'
const API_URL="http://localhost:5038/"
export default {
  
  name: 'GameDisplay',

  components: {
    
  },

  data () {
    return {
      games: []
    }
  },

  methods: {
    async refreshData() {
      axios.get(API_URL + 'getGames').then(
        (response)=> {
          this.games = response.data;
          this.loadGames();
        }
      )
      
      
    },
    loadGames() {
      $.each(this.games, function(i , game) {
        $(".gameContainer").append(`<div class="gameDisplay" id="${game._id}"><div class="imgDisplay"><img src="${game._image}" class="displayPic">       </div></div>`)
        $( `#${game._id}` ).on( "click", function() {
          window.location.href = '/gameReview/' + game._id
        });
      })
    }
  },
  
  mounted: function(){
    this.refreshData();
    }
    
}

</script>
