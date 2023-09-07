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
                <div class="mainDisplay">
                    <img id="mainPic" class="mainPic">
                </div>
                <div class="mainDisplay">
                    <div class="postComment" style="padding-top: 20px; padding-bottom: 20px;">
                        <textarea id="comment" placeholder="Post a comment!"></textarea>
                        <button style="float: right;" @click="addNewReview()">Post</button>
                    </div>
                    <div class="commentContainer">
                        <div class="displayComment" v-for="(review, item) in reviews" :key="item">
                            <div :id="'comment'+review._id" style="padding: 10px;padding-top: 0px;">
                                {{review.comment}}
                            </div>
                            <div :id="'updatedComment'+review._id" class="postComment" style="padding-top: 20px; padding-bottom: 20px; display: none;">
                                <textarea :id="review._id" placeholder="Post a comment!" v-model="review.comment"></textarea>
                                <button style="float: right;" @click="updateReview(review._id)">Update</button>
                            </div>
                            <div id="commentInfo">
                            <div style="float: left;">
                                {{ new Date(review.timeStamp).toUTCString() }}
                            </div>
                            <button @click="deleteReview(review._id)" style="float: right;">Delete</button>
                            <button @click="editReview(review._id)" style="float: right;">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </q-page-container>
   </q-layout>
</template>

<script>
import axios from 'axios' 
import $ from 'jquery'
const API_URL="http://localhost:5038/"



export default {
    
    name: 'GameReview',

    components: {
        
    },

    data () {
        return {
            id: window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
            game: [],
            reviews: []
        }
    },
    methods: {
    async loadGameImage(id) {
      axios.get(API_URL + 'getGames/' + id).then(
        (response)=> {
            this.game = response.data[0];
            $("#mainPic").attr("src", this.game._image);
        }
      )
    },
    async loadGameReview(id){
        axios.get(API_URL + 'getReviews/' + id).then(
        (response)=> {
            this.reviews = response.data;
            this.reviews = this.reviews.reverse();
        }
      )
    },
    async addNewReview() {
        var comment = document.getElementById('comment').value;
        const formData = new FormData();
        formData.append('gameId', this.id);
        formData.append('comment', comment);

        axios.post(API_URL + 'newReview', formData).then(
            (response) => {
                alert(response.data);
                this.loadGameReview(this.id);
            }
        )
    },
    async deleteReview(id){
        axios.delete(API_URL+"deleteReview/" + id).then(
            (response)=> {
                this.loadGameReview(this.id)
                alert(response.data);
            }
        )
    },
    async updateReview(id) {
        var comment = document.getElementById(id).value;
        const formData = new FormData();
        formData.append('_id', id)
        formData.append('comment', comment);

        axios.put(API_URL + 'updateReview/'+id, formData).then(
            (response) => {
                alert(response.data);
                this.loadGameReview(this.id);
            }
        )
        this.editReview(id);
    },
    editReview(id){
        var comment = document.getElementById("comment"+id);
        var commentTextBox = document.getElementById("updatedComment"+id);
        if (comment.style.display === "none" && commentTextBox.style.display === "block") {
            comment.style.display = "block";
            commentTextBox.style.display = "none";
        } else {
            comment.style.display = "none";
            commentTextBox.style.display = "Block";
        }
    }
  },
  
  mounted: function(){
    this.loadGameImage(this.id);
    this.loadGameReview(this.id);
    }
}

</script>