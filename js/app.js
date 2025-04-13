const typingText = document.querySelector(".typing-text p"),
inputField = document.querySelector(".wrapper .input-field"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
tryAgainBtn = document.querySelector("button");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;


const paragraphs = [
    `Success is not a straight path lined with victories and applause. It is often paved with setbacks, late nights, rejections, and a lot of learning. Every great person you admire has failed more times than they’ve succeeded, but what sets them apart is their decision to keep going. Success doesn't ask for perfection; it demands persistence. The world won’t always recognize your effort at first, and that’s okay. Keep building, keep growing, and your time will come. Remember, slow progress is better than no progress. Even on the days you feel stuck, you're still moving forward by showing up.`,
    `The digital age has transformed how we communicate, learn, and interact with the world. With a single tap, you can connect with someone on the other side of the globe, access libraries of knowledge, or start a business. But with all this power comes the responsibility of managing your time, attention, and privacy. Social media can either inspire you or consume you, depending on how you use it. Being constantly online can lead to burnout if you're not careful. So set boundaries, unplug when needed, and make technology your tool—not your master.`,
    `In a society obsessed with appearance, it's easy to forget that real value often lies beneath the surface. We're bombarded with images of perfection, from glossy magazine covers to flawless social media feeds. But perfection is a myth. The most genuine people often wear scars, not filters. Confidence comes not from fitting into a mold but from embracing your uniqueness. Instead of chasing approval, focus on authenticity. Your imperfections make you human, and your story matters more than any aesthetic. Be real, be kind, and be bold enough to shine in your own way.`,
    `Imagine a world without electricity. No lights, no internet, no instant communication. It’s hard to fathom now, but for most of human history, people lived without these modern comforts. The inventions that power our lives today started as simple ideas, pursued by relentless minds. Innovation isn't about being a genius—it's about being curious enough to ask questions and determined enough to find answers. From the light bulb to the smartphone, progress is born from persistence. The next big leap may come from someone like you, willing to solve a problem no one else wants to touch.`,
    `Failure is a word most people fear, but it shouldn't be. Failure is one of the best teachers life has to offer. It shows you where you went wrong, what you didn’t understand, and how much you really want your goals. The truth is, you can’t grow without a few missteps along the way. Every champion has tasted defeat, and it’s often those low moments that ignite the fire to succeed. So don’t fear falling. Fear never trying. Fear staying comfortable. Get up, learn from your mistakes, and come back stronger. That’s how real winners are made.`,
    `The human brain is a fascinating machine. It processes information faster than any computer, yet it can also be overwhelmed by stress, distraction, and emotion. In today’s fast-paced world, mental clarity has become more valuable than ever. Taking time to rest your mind is not a weakness—it's necessary. Whether through meditation, walking in nature, or simply being still, clearing mental clutter allows new ideas and creativity to flow. Protect your peace and prioritize your mental fitness. A calm mind is a productive mind, and clarity is your superpower.`,
    `We live in an age of instant gratification. We want quick answers, fast results, and effortless success. But true mastery doesn't work that way. Whether you're learning to code, play an instrument, or write a novel, the process takes time. It’s not about doing things perfectly the first time but improving with each attempt. The journey is where you build character, discipline, and resilience. Don't rush it. Enjoy the process, embrace the challenge, and understand that everything worthwhile requires consistent effort. The best things take time, and you're capable of creating something amazing if you stay committed.`,
    `Every generation faces unique challenges, and ours is no different. Climate change, mental health, misinformation, and inequality are issues we must confront. But we also have the tools, knowledge, and potential to create real change. Your voice matters. Your choices matter. It doesn’t take a million followers to make an impact—it takes heart, intention, and courage. Whether you're starting a community project or just treating people with respect, change starts with you. Don’t underestimate your power to influence the world in meaningful ways. The future is in your hands—build it wisely.`,
    `Communication is more than just talking; it’s about connection. Listening is just as powerful as speaking, if not more so. In a conversation, people often listen to reply, not to understand. But when you truly pay attention, you build trust, empathy, and respect. Good communication can save relationships, inspire teams, and create lasting change. So choose your words with care, and don’t underestimate the value of silence. Sometimes, the most powerful messages are felt rather than said. In a noisy world, be someone who listens with intent and speaks with purpose.`,
    `Life doesn’t always follow a straight path. Sometimes you’ll take detours, hit dead ends, or circle back before finding the right way forward. And that’s okay. Growth is rarely linear. What matters is that you keep moving. It’s easy to compare yourself to others, especially online, but everyone’s journey is different. What looks like success might be hiding struggle. Focus on your own progress, celebrate small wins, and give yourself grace. You are exactly where you need to be for the next chapter of your life to unfold. Keep going. Your story is still being written.`,
    `In the modern workplace, soft skills are becoming just as important as technical skills. Employers are not just looking for knowledge; they’re seeking people who can collaborate, think critically, and adapt to change. Emotional intelligence, communication, and leadership matter—especially in teams. You could be the best coder in the room, but if you can’t work with others, your impact is limited. Invest in your people skills. Learn to listen, share credit, and support those around you. A strong team culture wins more battles than raw talent alone.`,
    `Imagine the life you want, then start building it brick by brick. Vision without execution is just a dream. Want to be a great designer? Study, practice, and experiment daily. Want to be a hacker? Learn how systems work and break them down ethically. Skills aren’t born—they’re earned. Stop waiting for motivation to strike. Get disciplined. Take small steps every single day, even when it's boring or hard. Passion fades, but purpose pushes you through. You’re not far from your goals; you’re one habit away from turning them into reality.`,
    `Sometimes, the hardest thing to do is start. The blank page, the first line of code, the first step into something new—it’s intimidating. But action creates momentum, and momentum fuels confidence. Don’t overthink it. Start messy if you have to. Just start. Perfection is the enemy of progress. Every expert you admire was once a beginner who dared to try. Don’t let fear steal your future. Begin today, even if it's not perfect. You’ll learn more in one week of trying than in months of planning. The path will reveal itself once you begin walking.`,
    `Great design is invisible. It doesn’t scream for attention—it quietly improves your experience. Whether it's a sleek UI, a well-written line of code, or a clever user flow, good design puts the user first. It’s not just about looking pretty. It’s about solving problems. A truly great designer listens, observes, and tests relentlessly. They care more about how something works than how it looks. The best designs feel effortless, even though they’re the result of countless iterations. If you want to master design, fall in love with solving real problems.`,
    `When you chase your passion, the work doesn’t feel like a burden. Sure, it still gets tough, but it becomes meaningful. You don’t dread Mondays—you embrace them. The goal isn’t to avoid all stress, but to align your stress with your purpose. That’s what turns average days into fulfilling ones. You won’t always feel motivated, but if you care deeply about your “why,” you’ll keep moving through resistance. Find what lights you up, then pursue it with everything you've got. The world needs people who are alive with purpose.`,
    `Leadership isn’t about titles or power—it’s about service and influence. True leaders lift others up, listen before they speak, and act with integrity. Anyone can be a boss, but not everyone can lead. Leadership means taking responsibility even when it’s hard and setting the tone through your actions, not just your words. Whether you're managing a team or mentoring a friend, you lead every day through your choices. The most respected leaders don’t demand respect—they earn it by staying humble, showing up, and doing the right thing even when no one’s watching.`,
    `Your comfort zone is a beautiful place, but nothing ever grows there. If you want to level up, you have to be willing to feel uncomfortable. That’s where growth happens—in the space between fear and action. Every new skill you’ve ever learned started with awkwardness. But guess what? Awkward is good. Awkward means you’re stretching. Embrace it. Be a beginner. Be bad at something until you get good at it. The people who grow the fastest are the ones willing to look stupid for a while. So go ahead—step into discomfort and start evolving.`,
    `Habits will shape your destiny more than talent ever could. What you do daily is what you become. You don’t rise to the level of your goals—you fall to the level of your systems. That’s why routines matter. They’re the invisible architecture behind every successful life. Want to write a book? Write one page every day. Want to master code? Code one hour every night. It’s not about doing everything perfectly—it’s about showing up consistently. Success is built in the small moments, repeated again and again until they become unstoppable momentum.`,
    `Confidence isn’t walking into a room thinking you’re better than everyone. It’s knowing you don’t have to compete with anyone. You bring something unique to the table—your perspective, your style, your strengths. Own it. Stop waiting for permission to be yourself. Confidence comes from doing hard things and seeing what you’re made of. It grows every time you keep a promise to yourself, every time you choose progress over perfection. The more you show up, the more you’ll realize: you’ve had what it takes all along.`,
    `Legacy is not built by what you leave behind—it’s built by what you do while you're here. Every day, you influence people around you, even if you don’t realize it. Your energy, your words, your choices—they all ripple outward. You don’t need a stage to have impact. Just be consistent, be kind, and be relentless in your mission. Leave people better than you found them. Build something that outlives you. Whether it's a product, a message, or a movement, make it matter. Because at the end of it all, impact is what truly lasts.`
  ];

function randomParagraph(){
    let randIndex = Math.floor(Math.random()* paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(span => {
      let spanTag = `<span>${span}</span>`;
      typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener('keydown', () => inputField.focus());
    typingText.addEventListener('click', () => inputField.focus());

}

function initTyping(){
  const characters = typingText.querySelectorAll("span");
  let typedChar = inputField.value.split("")[charIndex];
  if(charIndex < characters.length -1 && timeLeft > 0){
    if(!isTyping){ // once timer has started wo'nt start again on every key clicked.
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
   
    // if a user typed a character and shown character matches then add the correct class else add the incorrect class.
    if(typedChar == null){
      charIndex--;// mistakes decrementation.
      // decrement mistakes only if charset contains incorrect class.
      if(characters[charIndex].classList.contains("incorrect")){
        mistakes--;
      }
      characters[charIndex].classList.remove("correct","incorrect");
    } else{
      if (characters[charIndex].innerText === typedChar){
        characters[charIndex].classList.add("correct");
      } else{
        mistakes ++;
        characters[charIndex].classList.add("incorrect");
    
      }
      charIndex ++; // increment charIndex either use correct or incorrect character.
      characters.forEach(span => span.classList.remove("active"));
      characters[charIndex].classList.add("active");
  
  
      let wpm = Math.round((((charIndex - mistakes)/ 5)/(maxTime - timeLeft)) *60);
      // if value is , empty or infinity then setting it's value to zero.
      wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
      mistakeTag.innerText = mistakes;
      wpmTag.innerText = wpm;
      cpmTag.innerText = charIndex - mistakes; // cpm won't count mistakes.
    }
  }else{
    inputField.value = "";
    clearInterval(timer);
  }
  }
 
function initTimer(){
   // if time left is greater than 0 then dcrement the timeLeft else clear timer
  if(timeLeft > 0){
    timeLeft --;
    timeTag.innerText = timeLeft;
  } else{
    clearInterval(timer);
  }
}

function resetGame(){
  // calling loadParagrath function and resetting each valiables and elements values to default.
  randomParagraph();
  inputField.value = "";
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  timeTag.innerText = timeLeft;
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
}

randomParagraph();
inputField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);