<template>
        <p class="photo-post-date bloc bloc-date-posting">
          <!-- <font-awesome-icon icon="calendar-alt" />
          {{ photo.createdAt.split("T")[0] }}
          <font-awesome-icon icon="clock" />
          {{ photo.createdAt.substring(11, 13) }}H{{
            photo.createdAt.substring(14, 16)
          }} -->
          <font-awesome-icon icon="history"/>
          {{ this.periodSincePosting}}
        </p>
</template>

<script>
export default {
    props: ['photo'],

    data() {
        return {
            dateOfPost: this.photo.createdAt,
            periodSincePosting: '',
        }
    },

    methods: {
        
        extractPostingPeriod() {
            const oneMinute = 60;
            const oneHour   = 60 * oneMinute;
            const oneDay    = 24 * oneHour ;
            const oneMonth  = 30 * oneDay; 
            const oneYear   = 12 * oneMonth;
            const dateOfPost = Date.parse(this.dateOfPost);

            const now = Date.parse(new Date());
            const deltaNowToPostInSeconds = (now - dateOfPost) / 1000;

            if (deltaNowToPostInSeconds < oneMinute) {
                this.periodSincePosting = ' Just Now';
            } else if (deltaNowToPostInSeconds >= oneMinute && deltaNowToPostInSeconds < oneHour) {
                if (deltaNowToPostInSeconds / oneMinute == 1) {
                    this.periodSincePosting = ' 1 minute ago !';
                } else {
                    this.periodSincePosting = ( deltaNowToPostInSeconds - deltaNowToPostInSeconds % oneMinute ) / oneMinute + ' minutes ago';
                } 
            } else if (deltaNowToPostInSeconds >= oneHour && deltaNowToPostInSeconds < oneDay) {
                if (deltaNowToPostInSeconds / oneHour == 1) {
                    this.periodSincePosting = ' 1 hours ago ';
                } else {
                    this.periodSincePosting = ( deltaNowToPostInSeconds - deltaNowToPostInSeconds % oneHour) / oneHour + ' hours ago';
                }
            } else if (deltaNowToPostInSeconds >= oneDay && deltaNowToPostInSeconds < oneMonth) {
                if (deltaNowToPostInSeconds / oneDay == 1) {
                    this.periodSincePosting = ' 1 day ago ';
                } else {
                    this.periodSincePosting = ( deltaNowToPostInSeconds - deltaNowToPostInSeconds % oneDay ) / oneDay + ' days ago';
                }
            } else if (deltaNowToPostInSeconds >= oneMonth && deltaNowToPostInSeconds < oneYear) {
                if (deltaNowToPostInSeconds / oneMonth == 1) {
                    this.periodSincePosting = ' 1 month ago ';
                } else {
                    this.periodSincePosting = ( deltaNowToPostInSeconds - deltaNowToPostInSeconds % oneMonth ) / oneMonth + ' months ago';
                }
            } else if (deltaNowToPostInSeconds >= oneYear) {
                if (deltaNowToPostInSeconds / oneMonth == 1) {
                    this.periodSincePosting = ' 1 year ago ';
                } else {
                    this.periodSincePosting = ( deltaNowToPostInSeconds - deltaNowToPostInSeconds % oneYear ) / oneYear + ' years ago';
                }
            }
        },
    },

    mounted() {
        this.extractPostingPeriod();
    }
}
</script>
