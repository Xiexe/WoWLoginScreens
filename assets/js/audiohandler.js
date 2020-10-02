var bgSelection = 0;
var audioSelect = {
    'Shadowlands' : './assets/audio/Shadowlands.ogg'
}
var audio;
var audioInitialPlayback = false;
var queuePos = null;
var disconnected = false;

function init()
{
    audio = new Audio(audioSelect.Shadowlands);
    window.addEventListener('click', waitForInteractionToPlayAudio);

    getPositionInQueue();
    setInterval( ()=>
    {    
        determineIfDisconnect();
    }, 5000);
}

function waitForInteractionToPlayAudio()
{
    if(!audioInitialPlayback)
    {
        audio.play();
        audioInitialPlayback = true;
    }
}

function determineIfDisconnect()
{
    if(!disconnected)
    {
        var rand = Math.random();

        if(rand > 0.2)
        {
            if(rand < 0.75)
                getPositionInQueue();
        }
        else
        {
            doDisconnect();
        }
    }
}

function getPositionInQueue()
{
    var number;
    if(queuePos === null)
    {    
        number = Math.floor(Math.random() * Math.floor(10000));
        queuePos = number;
    }
    else
    {
        number = Math.floor(queuePos - (Math.random() * Math.floor(15)));
        queuePos = number;

        if(queuePos < 1)
        {
            number = 0;
            queuePos = 0;
        }
    }

    document.getElementById('queuePosition').innerHTML = 'Position in Queue: ' + number;
    getEstimatedTime(number)
}

function getEstimatedTime(qPos)
{
    var time = Math.floor(Math.floor(qPos*2*3*2 + ((qPos*2*3*3) - (qPos*2*3*2)) * Math.random()) * 0.01);
    document.getElementById('queueTime').innerHTML = 'Estimated time: ' + time + ' min';
}

function doDisconnect()
{
    // disconnected = true;
    // console.log("DC'd")
}