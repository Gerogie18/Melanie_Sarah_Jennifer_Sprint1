window.addEventListener("DOMContentLoaded", function () {
    class Story {
        constructor(noun1, noun2, noun3, adj1, adj2, adj3, verb1a, verb1b, verb2a, verb2b, prep) {
            this.noun1 = noun1
            this.noun2 = noun2
            this.noun3 = noun3
            this.adj1 = adj1;
            this.adj2 = adj2;
            this.adj3 = adj3;
            this.verb1 = {
            verb1a: verb1a
            ,verb1b: verb1b
            };
            this.verb2 = {
            verb2a: verb2a
            ,verb2b: verb2b
            };
            this.prep = prep;

            this.createStory();
        }

    
      //  methods
      createStory() {
        // if (book.title === "" || book.isbn === "" || book.author === "") {
        //   this.showAlert("No field should be empty", "error");
        // } else {
          let div = document.createElement("div");
          div.id = 'story';
          //div.className = "hideDiv";
          div.innerHTML = `<p> The Three <u class="highlight">${this.adj1}</u> <u class="highlight">${this.noun1}</u>: The Retelling, Part 1<br />
      
      Once upon a time there were three <u class="highlight">${this.adj1}</u> <u class="highlight">${this.noun1}</u> who lived on the same street. One day, a(n) <u class="highlight">${this.noun2.noun2a}</u> happened to pass by the street where the three <u class="highlight">${this.adj1}</u> <u class="highlight">${this.noun1}</u> lived. She stopped at the first house that was made of <u class="highlight">${this.noun3}</u> and she smelled the <u class="highlight">${this.noun1}</u> inside. She thought the <u class="highlight">${this.noun1}</u> would make a mighty __________________[Adj2] meal and her mouth began to water. So she knocked on the door and said: “<u class="highlight">${this.adj1}</u> <u class="highlight">${this.noun1}</u>! <u class="highlight">${this.adj1}</u> <u class="highlight">${this.noun1}</u>! Let me in!”<br />
      But the <u class="highlight">${this.adj1}</u> <u class="highlight">${this.noun1}</u> saw the <u class="highlight">${this.noun2.noun2a}</u>'s <u class="highlight">${this.adj3}</u> paws through the keyhole, so he answered back: “No! Not by the hairs on my chinny chin chin!”<br />
      Then the <u class="highlight">${this.noun2.noun2a}</u> showed her teeth and said: “Then I’ll <u class="highlight">${this.verb1.verb1a}</u> and <u class="highlight">${this.verb2.verb2b}</u> and blow your house in.”<br />
      So she started to<u class="highlight">${this.verb1.verb1a}</u> and to <u class="highlight">${this.verb2.verb2a}</u> and she blew the house down! The <u class="highlight">${this.noun2.noun2a}</u> opened her jaws very wide and bit down as hard as she could, but the first <u class="highlight">${this.adj1}</u> <u class="highlight">${this.noun1}</u> escaped and ran away to hide with the second <u class="highlight">${this.adj1}</u> <u class="highlight">${this.noun1}</u>.<br />
      The second house (a stick house) went much like the first house, and now there were three <u class="highlight">${this.adj1}</u> <u class="highlight">${this.noun1}</u> hiding in one brick house.  <br />
      
      
      The Three <u class="highlight">${this.adj1}</u> <u class="highlight">${this.noun1}</u>: The Retelling, Part 2<br />
      The <u class="highlight">${this.noun2.noun2a}</u> hadn't eaten all day and she had worked up a(n) <u class="highlight">${this.adj2}</u> appetite, chasing the <u class="highlight">${this.adj1}</u> <u class="highlight">${this.noun1}</u> around. She stood outside the brick house. Though it was much sturdier than the other houses, but she could still smell all three of the <u class="highlight">${this.noun1}</u> inside. She knew that they would make a(n) <u class="highlight">${this.adj3}</u> <u class="highlight">${this.noun3}</u>. <br />
      
      So, the <u class="highlight">${this.noun2.noun2a}</u> knocked on the door and said: "<u class="highlight">${this.adj1}</u> <u class="highlight">${this.noun1}</u>! <u class="highlight">${this.adj1}</u> <u class="highlight">${this.noun1}</u>! Let me in!"<br />
      But the <u class="highlight">${this.adj1}</u> <u class="highlight">${this.noun1}</u> saw the <u class="highlight">${this.noun2.noun2a}</u>'s narrow eyes through the keyhole, so they answered back:  "No! No! No! Not by the hairs on our chinny chin chin!"<br />
      So the <u class="highlight">${this.noun2.noun2a}</u> showed her teeth and said: “Then I’ll <u class="highlight">${this.verb1.verb1a}</u> and I’ll <u class="highlight">${this.verb2.verb2a}</u> and I’ll blow your house in!”<br />
      Well, she <u class="highlight">${this.verb1.verb1b}</u> and she <u class="highlight">${this.verb2.verb2b}</u>. She <u class="highlight">${this.verb2.verb2b}</u> and she <u class="highlight">${this.verb1.verb1b}</u>. And she <u class="highlight">${this.verb1.verb1b}</u>, <u class="highlight">${this.verb1.verb1b}</u>, and she <u class="highlight">${this.verb2.verb2b}</u>, <u class="highlight">${this.verb2.verb2b}</u>; but she could not blow the house down. At last, the <u class="highlight">${this.noun2.noun2a}</u> was so out of breath that she couldn't <u class="highlight">${this.verb1.verb1a}</u> and she couldn't <u class="highlight">${this.verb2.verb2a}</u> anymore. So, she left and went to the restaurant further down the street.</p>`
          document.querySelector("#userStory").appendChild(div);
          // this.clearFields();
          // this.showAlert("Book Successfully added", "success");
        }
      
  
    //   clearFields() {
    //     document.querySelector("#title").value = "";
    //     document.querySelector("#isbn").value = "";
    //     document.querySelector("#author").value = "";
    //   }
  
    //   showAlert(m, c) {
    //     let div = document.createElement("div");
    //     div.innerText = m;
    //     div.className = c;
    //     div.id = "box";
    //     document.querySelector("#notify").appendChild(div);
    //     setTimeout(function () {
    //       document.querySelector("#box").remove();
    //     }, 3000);
    //   }  
    }
    // // this class will be used to permanently store books in the browser memory....
    // class Store {
    //   // thsi will add the book object to the browser memory when called...
    //   static addBook(book) {
    //     var books = Store.getBooks(); //read already store books from the memory
    //     books.push(book);
    //     //   stringify converst normal object into json...
    //     localStorage.setItem("books", JSON.stringify(books));
    //   }
    //   static getBooks() {
    //     var books;
  
    //     if (localStorage.getItem("books") === null) {
    //       books = [];
    //     } else {
    //       // the stored data is json...
    //       // we need to convert it into normal objects...
  
    //       books = JSON.parse(localStorage.getItem("books"));
    //     }
    //     return books;
    //   }
    //   static displayBooks() {
    //     var books = Store.getBooks();
    //     books.forEach((book) => {
    //       // each book should be displayed in the table below form..
    //       //addBookToList(book); //cannot directly call addBookToList(). Why? because addBookTOList() is in another class and it is not STATIC....
  
    //       var objBook = new Book();
    //       objBook.addBookToList(book);
    //     });
    //   }
    //   static removeBook(isbn) {
    //     // remove a book from memory...
    //     // use filter() method: filter() returns a new array on the basis of given condition...
  
    //     // books = books.filter((book)=>)
  
    //     var books = Store.getBooks();
    //     books = books.filter((book) => book.isbn !== isbn);
  
    //     localStorage.setItem("books", JSON.stringify(books));
    //   }
    // }
  
    let form = document.querySelector("#storyForm");
    form.addEventListener("submit", function (event) {
      // collect information from all the text fields...
    //   const formData = new FormData(event.target);
    //   const data = {};
    //   formData.forEach((value, key) => data[key] = value);
    //   console.log(data);
    
    
      // Capture form data for categories 1-4
      let noun1 = document.getElementById('noun1').value;
      let noun2 = document.getElementById('noun2').value;
      let noun3 = document.getElementById('noun3').value;
      let adj1 = document.getElementById('adj1').value;
      let adj2 = document.getElementById('adj2').value;
      let adj3 = document.getElementById('adj3').value;
      let verb1a = document.getElementById('verb1a').value;
      let verb1b = document.getElementById('verb1b').value;
      let verb2a = document.getElementById('verb2a').value;
      let verb2b = document.getElementById('verb2b').value;
      let prep = document.getElementById('prep').value;
  
      let story = new Story(noun1, noun2, noun3, adj1, adj2, adj3, verb1a, verb1b, verb2a, verb2b, prep);
  
      story.createStory(story); //adding the book to UI
    //   Store.addBook(book); //static members are called class level members...
    //   book.showAlert("Book Successfully added", "success");
      event.preventDefault();
    });
});
