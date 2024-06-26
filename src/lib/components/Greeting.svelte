<script lang="ts">
    var myDate = new Date();
    var hrs = myDate.getHours();
    var mins = myDate.getMinutes(); // changed date to myDate
    var greet: string;

    //   morning |  5:30-11:59
    // afternoon | 12:00-17:59
    //   evening | 18:00-05:29
    if (hrs >= 5 && ((hrs == 5 && mins >= 30) || (hrs > 5 && hrs < 12)))
        greet = "Good Morning";
    else if (hrs >= 12 && hrs < 18) greet = "Good Afternoon";
    else if ((hrs >= 18 && hrs < 24) || hrs > 0) greet = "Good Evening";
    else greet = "Error";
</script>

<div class="md:text-5xl text-3xl mx-[1vw] font-header">{greet}</div>
