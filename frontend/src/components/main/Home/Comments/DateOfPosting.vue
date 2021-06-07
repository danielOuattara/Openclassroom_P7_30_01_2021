<template>
<!-- Comment!-->
        <p class="comment-post-date bloc bloc-date-posting">
          <!-- <font-awesome-icon icon="calendar-alt" />
          {{ comment.createdAt.split("T")[0] }}
          <font-awesome-icon icon="clock" />
          {{ comment.createdAt.substring(11, 13) }}H{{
            comment.createdAt.substring(14, 16)
          }} -->
          <font-awesome-icon icon="history"/>
          {{ this.periodSincePosting}}
        </p>
</template>

<script>
export default {
    props: ['comment'],

    data() {
        return {
            dateOfPost: this.comment.createdAt,
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
                    this.periodSincePosting = ' 1 minute';
                } else {
                    this.periodSincePosting = ( deltaNowToPostInSeconds - deltaNowToPostInSeconds % oneMinute ) / oneMinute + ' minutes';
                } 
            } else if (deltaNowToPostInSeconds >= oneHour && deltaNowToPostInSeconds < oneDay) {
                if (deltaNowToPostInSeconds / oneHour == 1) {
                    this.periodSincePosting = ' 1 hours';
                } else {
                    this.periodSincePosting = ( deltaNowToPostInSeconds - deltaNowToPostInSeconds % oneHour) / oneHour + ' hours';
                }
            } else if (deltaNowToPostInSeconds >= oneDay && deltaNowToPostInSeconds < oneMonth) {
                if (deltaNowToPostInSeconds / oneDay == 1) {
                    this.periodSincePosting = ' 1 day';
                } else {
                    this.periodSincePosting = ( deltaNowToPostInSeconds - deltaNowToPostInSeconds % oneDay ) / oneDay + ' days';
                }
            } else if (deltaNowToPostInSeconds >= oneMonth && deltaNowToPostInSeconds < oneYear) {
                if (deltaNowToPostInSeconds / oneMonth == 1) {
                    this.periodSincePosting = ' 1 month';
                } else {
                    this.periodSincePosting = ( deltaNowToPostInSeconds - deltaNowToPostInSeconds % oneMonth ) / oneMonth + ' months';
                }
            } else if (deltaNowToPostInSeconds >= oneYear) {
                if (deltaNowToPostInSeconds / oneMonth == 1) {
                    this.periodSincePosting = ' 1 year';
                } else {
                    this.periodSincePosting = ( deltaNowToPostInSeconds - deltaNowToPostInSeconds % oneYear ) / oneYear + ' years';
                }
            }
        },
    },

    mounted() {
        this.extractPostingPeriod();
    }
}
</script>
