---
layout: post
title: "How to Add Randomized Avatars to Your React App"
comments: true
---

I build a lot of sample apps, and oftentimes I need my apps to show images of people.

But showing images of people can be problematic, as you want to show a diverse set of people without having to buy a huge collection of stock photos.

Enter [Avataaars](https://getavataaars.com/), an awesome service that lets you generate avatar SVG images from an impressive list of possible options.

<img src="/images/posts/2021-05-14/avataaars.png" alt="The avataaars service in action" class="plain">

After finding Avataaars, its [corresponding React component](https://github.com/fangpenlin/avataaars), and writing a bit of my own code to randomize an avatar’s options, I was able to create this fun dashboard of random fake humans.

<img src="/images/posts/2021-05-14/dashboard.png" alt="An example of a sample dashboard I built" class="plain">

Here’s how I did it.

## Getting started with Avataaars

To get started the first thing you’ll need is a React app. You can use an existing React app, or create a new one using [Create React App](https://github.com/facebook/create-react-app) and the commands below.

<pre class="language-shell"><code class="language-shell">npx create-react-app random-avatars
cd random-avatars
</code></pre>

Next, go ahead and install the Avataaars React component as a dependency.

<pre class="language-shell"><code class="language-shell">npm install avataaars
</code></pre>

After that, open your `src/App.js` file (or build a new component in your existing app), and replace its contents with the following code, which shows off the basic usage of an Avataaars avatar.

<pre class="language-javascript"><code class="language-javascript">import Avatar from 'avataaars';

function App() {
  return (
    &lt;&gt;
      &lt;Avatar avatarStyle="Circle" /&gt;
    &lt;/&gt;
  );
}

export default App;
</code></pre>

If you run `npm run start` you should now have a single Avatar with the default settings.

<img src="/images/posts/2021-05-14/default-avatar.png" alt="Browser with the default avatar look" class="plain">

If you want to experiment a bit, the code below shows a full list of the props the `<Avatar>` component accepts with a few random values thrown in. (You can see a full list of the options the component expects on the [Avataaars service’s site](https://getavataaars.com).)

<pre class="language-javascript"><code class="language-javascript">{% raw %}&lt;Avatar
  style={{ width: '100px', height: '100px' }}
  avatarStyle='Circle'
  topType='ShortHairShortFlat'
  accessoriesType='Blank'
  hairColor='Brown'
  facialHairType='Blank'
  clotheType='Hoodie'
  clotheColor='Blue03'
  eyeType='Default'
  eyebrowType='Default'
  mouthType='Smile'
  skinColor='Pale' /&gt;
{% endraw %}</code></pre>

This is cool, but the real fun I had with Avataaars was randomizing all of these options, so let’s look at how to do that.

## Randomizing the Avatars

The logic you need to randomize the avatar’s properties is pretty simple, as all you need to do is take all available property values, and choose one value for each property. To do so, go ahead and create a new `src/avatar.js` file and give it the following code.

<pre class="language-javascript"><code class="language-javascript">const configs = {
  topType: [
    'NoHair',
    'Eyepatch',
    'Hat',
    'Hijab',
    'Turban',
    'WinterHat1',
    'WinterHat2',
    'WinterHat3',
    'WinterHat4',
    'LongHairBigHair',
    'LongHairBob',
    'LongHairBun',
    'LongHairCurly',
    'LongHairCurvy',
    'LongHairDreads',
    'LongHairFrida',
    'LongHairFro',
    'LongHairFroBand',
    'LongHairNotTooLong',
    'LongHairShavedSides',
    'LongHairMiaWallace',
    'LongHairStraight',
    'LongHairStraight2',
    'LongHairStraightStrand',
    'ShortHairDreads01',
    'ShortHairDreads02'
  ],
  accessoriesType: [
    'Blank',
    'Kurt',
    'Prescription01',
    'Prescription02',
    'Round',
    'Sunglasses',
    'Wayfarers'
  ],
  hatColor: [
    'Black',
    'Blue01',
    'Blue02',
    'Blue03',
    'Gray01',
    'Gray02',
    'Heather',
    'PastelBlue',
    'PastelGreen',
    'PastelOrange',
    'PastelRed',
    'PastelYellow',
    'Pink',
    'Red',
    'White'
  ],
  hairColor: [
    'Auburn',
    'Black',
    'Blonde',
    'BlondeGolden',
    'Brown',
    'BrownDark',
    'PastelPink',
    'Platinum',
    'Red',
    'SilverGray'
  ],
  facialHairType: [
    'Blank',
    'BeardMedium',
    'BeardLight',
    'BeardMajestic',
    'MoustacheFancy',
    'MoustacheMagnum'
  ],
  facialHairColor: [
    'Auburn',
    'Black',
    'Blonde',
    'BlondeGolden',
    'Brown',
    'BrownDark',
    'Platinum',
    'Red'
  ],
  clotheType: [
    'BlazerShirt',
    'BlazerSweater',
    'CollarSweater',
    'GraphicShirt',
    'Hoodie',
    'Overall',
    'ShirtCrewNeck',
    'ShirtScoopNeck',
    'ShirtVNeck'
  ],
  clotheColor: [
    'Black',
    'Blue01',
    'Blue02',
    'Blue03',
    'Gray01',
    'Gray02',
    'Heather',
    'PastelBlue',
    'PastelGreen',
    'PastelOrange',
    'PastelRed',
    'PastelYellow',
    'Pink',
    'Red',
    'White'
  ],
  graphicType: [
    'Bat',
    'Cumbia',
    'Deer',
    'Diamond',
    'Hola',
    'Pizza',
    'Resist',
    'Selena',
    'Bear',
    'SkullOutline',
    'Skull'
  ],
  eyeType: [
    'Close',
    'Cry',
    'Default',
    'Dizzy',
    'EyeRoll',
    'Happy',
    'Hearts',
    'Side',
    'Squint',
    'Surprised',
    'Wink',
    'WinkWacky'
  ],
  eyebrowType: [
    'Angry',
    'AngryNatural',
    'Default',
    'DefaultNatural',
    'FlatNatural',
    'RaisedExcited',
    'RaisedExcitedNatural',
    'SadConcerned',
    'SadConcernedNatural',
    'UnibrowNatural',
    'UpDown',
    'UpDownNatural'
  ],
  mouthType: [
    'Concerned',
    'Default',
    'Disbelief',
    'Eating',
    'Grimace',
    'Sad',
    'ScreamOpen',
    'Serious',
    'Smile',
    'Tongue',
    'Twinkle',
    'Vomit'
  ],
  skinColor: [
    'Tanned',
    'Yellow',
    'Pale',
    'Light',
    'Brown',
    'DarkBrown',
    'Black'
  ]
}

const configsKeys = Object.keys(configs);

export function generateRandomAvatarOptions() {
  const options = { }
  const keys = [...configsKeys]
  keys.forEach(key => {
    const configArray = configs[key];
    options[key] = configArray[Math.floor(Math.random()*configArray.length)];
  })

  return options;
}
</code></pre>

Next, return to your `src/App.js` file, and replace its contents with the following code, which uses your new `src/avatar.js` file’s `generateRandomAvatarOptions()` function to generate a random set of props for the `<Avatar>` component.

<pre class="language-javascript"><code class="language-javascript">{% raw %}import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from './avatar';

function App() {
  return (
    <>
      <Avatar
        style={{ width: '100px', height: '100px' }}
        avatarStyle='Circle'
        {...generateRandomAvatarOptions() } />
    </>
  );
}

export default App;
{% endraw %}</code></pre>

If you return to your browser you should now see a completely random avatar.

<img src="/images/posts/2021-05-14/random-avatar.png" alt="A browser with a completely random avatar" class="plain">

To really verify this is working as intended (and to have a bit of fun), return to your `src/App.js ` file and replace its contents with the following code, which creates 100 random avatar images.

<pre class="language-javascript"><code class="language-javascript">{% raw %}import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from './avatar';

function App() {
  return (
    <>
      {[...Array(100)].map(() => (
        <Avatar
        style={{ width: '100px', height: '100px' }}
        avatarStyle='Circle'
        {...generateRandomAvatarOptions()} />
      ))}
    </>
  );
}

export default App;
{% endraw %}</code></pre>

Save this change and return to your browser to see an amazing set of randomly generated avatars, perfect for your next sample app.

<img src="/images/posts/2021-05-14/lots-of-avatars.png" alt="A browser with 100 random avatars" class="plain">

Feel free to use any of what I show in this article in your apps. And a big shout out to the people being Avataaars, as it’s a super useful utility that’s helped me build better demos.