var Mustache = require('mustache');
var fs = require('fs');


var headline = process.argv[2];
var HeadlineIpsum = function() {}
var HEADLINES = [
  'Ball Abandoned in Hole',
  'Pants Successfully Slobber Bombed',
  '9 Sticks Rescued from Anonymity',
  'Daily Feet Warming Event',
  'Doggy Slipper Union in Revolt',
  'Treat Reserves Dangerously Low',
  'Sitting Strike Leader Demands More Pets',
  'Neighborhood Dogs Disturb Game of Catch',
  'Lake Pauline Cruise Company adds new Kayak',
];
HeadlineIpsum.prototype.generate = function() {
  var index = Math.floor(Math.random() * HEADLINES.length)
  return HEADLINES[index];
}

// Credit to https://doggoipsum.com/
var LoremIpsum=function(){};

LoremIpsum.WORDS_PER_SENTENCE_AVG=8;
LoremIpsum.WORDS_PER_SENTENCE_STD=4;
LoremIpsum.WORDS=[
  "doggo","shibe","shoob","shoober","doggorino","shooberino",
  "long doggo","length boy","noodle horse","long water shoob",
  "aqua doggo","pupper","yapper","pupperino","wrinkler",
  "puggorino","puggo","corgo","porgo","woofer","long woofer",
  "sub woofer","heckin angery woofer","heckin good boys","floofs",
  "fluffer","waggy wags","long bois","clouds","boofers","smol",
  "big ol","doge","bork","borkf","mlem","blep","blop","pats",
  "tungg","snoot","ruff","borkdrive","thicc","boof","h*ck","heck","heckin",
  "vvv","heckin good boys and girls","big ol pupper",
  "you are doing me a frighten","doing me a frighten",
  "you are doing me the shock","ur givin me a spook",
  "you are doin me a concern","stop it fren","maximum borkdrive",
  "very good spot","adorable doggo","what a nice floof","the neighborhood pupper",
  "borking doggo","many pats","lotsa pats","he made many woofs","dat tungg tho",
  "smol borking doggo with a long snoot for pats","most angery pupper I have ever seen",
  "wow such tempt","much ruin diet","wow very biscit","very hand that feed shibe",
  "such treat","very taste wow","I am bekom fat","extremely cuuuuuute",
  "very jealous pupper","super chub","fat boi"];

LoremIpsum.prototype.generate = function(num_words){
  var words,ii,position,word,current,sentences,sentence_length,sentence;num_words=num_words||100;
  words=[LoremIpsum.WORDS[0],LoremIpsum.WORDS[1]];
  num_words-=2;
  for(ii=0;ii<num_words;ii++){
    position=Math.floor(Math.random()*LoremIpsum.WORDS.length);
    word=LoremIpsum.WORDS[position];
    if(ii>0&&words[ii-1]===word){
      ii-=1;
    } else {
      words[ii]=word;
    }
  }
  sentences=[];
  current=0;
  while(num_words>0){
    sentence_length=this.getRandomSentenceLength();
    if(num_words-sentence_length<4){
      sentence_length=num_words;
    }
    num_words-=sentence_length;
    sentence=[];
    for(ii=current;ii<(current+sentence_length);ii++){
      sentence.push(words[ii]);
    }
    sentence=this.punctuate(sentence);
    current+=sentence_length;
    sentences.push(sentence.join(' '));
  }
  return sentences.join(' ');
};

LoremIpsum.prototype.punctuate=function(sentence){
  var word_length,num_commas,ii,position;word_length=sentence.length;sentence[word_length-1]+='.';
  if(word_length<4){
    return sentence;
  }
  num_commas=this.getRandomCommaCount(word_length);
  for(ii=0;ii<=num_commas;ii++){
    position=Math.round(ii*word_length/(num_commas+1));
    if(position<(word_length-1)&&position>0){
      sentence[position]+=',';
    }
  }
  sentence[0]=sentence[0].charAt(0).toUpperCase()+sentence[0].slice(1);
  return sentence;
};

LoremIpsum.prototype.getRandomCommaCount=function(word_length){
  var base,average,standard_deviation;
  base=6;
  average=Math.log(word_length)/Math.log(base);
  standard_deviation=average/base;
  return Math.round(this.gaussMS(average,standard_deviation));
};

LoremIpsum.prototype.getRandomSentenceLength=function(){
  return Math.round(this.gaussMS(LoremIpsum.WORDS_PER_SENTENCE_AVG,LoremIpsum.WORDS_PER_SENTENCE_STD));
};

LoremIpsum.prototype.gauss=function(){
  return(Math.random()*2-1)+ (Math.random()*2-1)+ (Math.random()*2-1);
};

LoremIpsum.prototype.gaussMS=function(mean,standard_deviation){
  return Math.round(this.gauss()*standard_deviation+mean);
};

var content = Mustache.render(
`<!doctype html>
<html>
  <head>
    <title>The Daily Dunis</title>
    <meta name="description" content="Your Daily Dose of Dunis">
    <meta property="og:title" content="{{date}} - {{title}}" />
    <meta property="og:url" content="https://didericis.github.io/daily-dunis/" />
    <meta property="og:image" content="https://didericis.github.io/daily-dunis/daily_dunis.jpeg" />
    <meta name="viewport" content="width=device-width">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
    <link rel="manifest" href="site.webmanifest">
    <link rel="mask-icon" href="safari-pinned-tab.svg" color="#5bbad5">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet">
    <style type="text/css">
      @font-face {
        font-family: oldlondon;
        src: url('old_london/OldLondon.ttf') format('truetype');
        font-weight: bold;
      }

      h1, h2 {
        font-family: "oldlondon";
        font-size: 50px;
        text-align: center
      }

      h1 {
        margin: 1.5rem 0;
      }

      article {
        display: flex;
        padding: 1rem 0;
        flex-direction: row-reverse;
      }

      body {
        font-family: 'Playfair Display', serif;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 2rem;
      }

      main {
        max-width: 800px;
        position: relative;
      }

      .title {
        border-bottom: 1px solid #CCC;
        position: relative;
      }

      .main-image {
        width: 200px;
        padding-left: 2rem;
      }

      .main-image-container {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #date {
        position: absolute;
        bottom: 0;
      }
  
      @media only screen and (max-width: 600px) {
        article {
          flex-direction: column;
        }

        .main-image {
          width: 100%;
          padding: 0;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <div class="title">
        <h1>The Daily Dunis</h1>
        <span id="date">{{date}}</span>
      </div>
      <article>
        <div class='main-image-container'>
          <img class='main-image' src="daily_dunis.jpeg" />
        </div>
        <div>
          <h3 id="title">{{title}} </h3>
          <p id="content">{{content}}</p>
        </div>
      </article>
  </body>
</html>`, 
  {
    date: (new Date()).toDateString(),
    content: LoremIpsum.prototype.generate(60),
    title: headline ? headline : HeadlineIpsum.prototype.generate()
  }
);


fs.writeFile('index.html', content, err => {
  if (err) {
    console.error(err);
  }
  console.log('Done');
});