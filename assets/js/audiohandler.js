var expansion = 8;
var audioSelect = {
    'BattleForAzeroth' : './assets/audio/BattleForAzeroth.ogg',
    'Shadowlands' : './assets/audio/Shadowlands.ogg'
}
var videoSelect = {
    'BattleForAzeroth' : './assets/img/bg/BattleForAzeroth.webm',
    'Shadowlands' : './assets/img/bg/Shadowlands.webm'
}
var logoSelect = {
    'BattleForAzeroth' : './assets/img/ui/logos/BattleForAzeroth.png',
    'Shadowlands' : './assets/img/ui/logos/Shadowlands.png',
}
var audio = new Audio();
var buttonAudio = new Audio();
var audioInitialPlayback = false;
var queuePos = null;
var disconnected = false;

function init()
{
    switchExpansion();
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
        buttonAudio.volume = 0.5;
        audio.volume = 0.1;
        audio.loop = true;
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

function manualChangeExpac()
{
    console.log("Changing xpac to: ");
    expansion += 1;
    if(expansion > 8)
        expansion = 0;
    
    switchExpansion();
}

function switchExpansion()
{
    queuePos = null;
    getPositionInQueue();

    var bg = document.getElementById('background');
    var logo = document.getElementById('logo')
    audio.pause();
    switch(expansion)
    {
        case 0:
            console.log('Vanilla');
            expansion = 7;
            switchExpansion();
        break;

        case 1:
            console.log('Burning Crusade');
            expansion = 7;
            switchExpansion();
        break;

        case 2:
            console.log('Wrath of the Lich King');
            expansion = 7;
            switchExpansion();
        break;

        case 3:
            console.log('Cataclysm');
            expansion = 7;
            switchExpansion();
        break;

        case 4:
            console.log('Mists of Pandaria');
            expansion = 7;
            switchExpansion();
        break;

        case 5:
            console.log('Warlords of Draenor');
            expansion = 7;
            switchExpansion();
        break;

        case 6:
            console.log('Legion');
            expansion = 7;
            switchExpansion();
        break;

        case 7:
            console.log('Battle for Azeroth');
            audio.src = audioSelect.BattleForAzeroth;
            bg.setAttribute('src', videoSelect.BattleForAzeroth);
            logo.style.background = `url(${logoSelect.BattleForAzeroth})`;
        break;

        case 8:
            console.log('Shadowlands');
            audio.src = audioSelect.Shadowlands;
            bg.setAttribute('src', videoSelect.Shadowlands);
            logo.style.background = `url(${logoSelect.Shadowlands})`;
        break;
    }
    audio.play();
}

function playButtonAudio(index)
{
    buttonAudio.pause();
    buttonAudio.time = 0;
    
    if(index === 0)
        buttonAudio.src = './assets/audio/ui/button_click.ogg';
    else
        buttonAudio.src = './assets/audio/ui/button_click_big.ogg';
    
    buttonAudio.play();
}