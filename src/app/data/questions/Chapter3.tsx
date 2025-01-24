import { QuizQuestion } from "../commonTypes";

export const chapter3Questions: QuizQuestion[] = [
  {
    id: 1,
    question: {
      text: "Which of the following is a false statement about the methods？",
      code: {
        content: `
        public class Time
        {
          private int hrs;
          private int mins;
          private int secs;

          public Time()
          { /* implementation not shown */ }

          public Time(int h, int m, int s)
          { /* implementation not shown */ }

          /** Resets time to hrs = h, mins = m, secs = s. */
          public void resetTime(int h, int m, int s)
          { /* implementation not shown */ }

          /** Advances time by one second. */
          public void increment()
          { /* implementation not shown */ }

          /** Returns true if this time equals t, false otherwise. */
          public boolean equals(Time t)
          { /* implementation not shown */ }

          /** Returns true if this time is earlier than t, false otherwise. */
          public boolean lessThan(Time t)
          { /* implementation not shown */ }

          /** Returns a String with the time in the form hrs:mins:secs. */
          public String toString()
          { /* implementation not shown */ }
        }`,
        language: "java",
      },
    },
    code: "",
    language: "java",
    options: [
      {
        text: "equals, lessThan, and toString are all accessor methods",
      },
      {
        text: "increment is a mutator method",
      },
      {
        text: "Time() is the no-argument constructor",
      },
      {
        text: "The Time class has three constructors",
      },
      {
        text: "There are no static methods in this class",
      },
    ],
    correctAnswer: 3,
    explanationEN: "There are just two constructors. Constructors are recognizable by having the same name as the class, and no return type",
    explanationCN: "這個類中只有兩個構造函數。構造函數的特徵是與類名相同，並且沒有返回類型。這裡只有 Time() 和 Time(int h, int m, int s) 兩個構造函數，而不是三個。"
  },
  {
    id: 2,
    question: {
      text: "Which of the following represents correct implementation code for the constructor with parameters?",
      code: {
        content: `public class Time
{
  private int hrs;
  private int mins;
  private int secs;

  public Time()
  { /* implementation not shown */ }

  public Time(int h, int m, int s)
  { /* implementation not shown */ }

  /** Resets time to hrs = h, mins = m, secs = s. */
  public void resetTime(int h, int m, int s)
  { /* implementation not shown */ }

  /** Advances time by one second. */
  public void increment()
  { /* implementation not shown */ }

  /** Returns true if this time equals t, false otherwise. */
  public boolean equals(Time t)
  { /* implementation not shown */ }

  /** Returns true if this time is earlier than t, false otherwise. */
  public boolean lessThan(Time t)
  { /* implementation not shown */ }

  /** Returns a String with the time in the form hrs:mins:secs. */
  public String toString()
  { /* implementation not shown */ }
}`,
        language: "java",
      },
    },
    code: "",
    language: "java",
    options: [
      {
        text: "Option A:",
        code: {
          content: `hrs = 0;
mins = 0;
secs = 0;`,
          language: "java",
        },
      },
      {
        text: "Option B:",
        code: {
          content: `hrs = h;
mins = m;
secs = s;`,
          language: "java",
        },
      },
      {
        text: "Option C:",
        code: {
          content: `resetTime(hrs, mins, secs);`,
          language: "java",
        },
      },
      {
        text: "Option D:",
        code: {
          content: `h = hrs;
m = mins;
s = secs;`,
          language: "java",
        },
      },
      {
        text: "Option E:",
        code: {
          content: `Time = new Time(h, m, s);`,
          language: "java",
        },
      },
    ],
    correctAnswer: 1,
    explanationEN: "Constructor parameters should be assigned to the instance variables. Option B shows the correct implementation where the parameter values (h, m, s) are assigned to the instance variables (hrs, mins, secs).",
    explanationCN: "構造函數參數應該被賦值給實例變量。選項 B 展示了正確的實現方式，其中參數值(h, m, s)被賦值給實例變量(hrs, mins, secs)。這是初始化對象屬性的正確方式。"
  },
  {
    id: 3,
    question: {
      text: "A client class has a display method that writes the time represented by its parameter:",
      code: {
        content: `
        public class Time
        {
          private int hrs;
          private int mins;
          private int secs;

          public Time()
          { /* implementation not shown */ }

          public Time(int h, int m, int s)
          { /* implementation not shown */ }

          /** Resets time to hrs = h, mins = m, secs = s. */
          public void resetTime(int h, int m, int s)
          { /* implementation not shown */ }

          /** Advances time by one second. */
          public void increment()
          { /* implementation not shown */ }

          /** Returns true if this time equals t, false otherwise. */
          public boolean equals(Time t)
          { /* implementation not shown */ }

          /** Returns true if this time is earlier than t, false otherwise. */
          public boolean lessThan(Time t)
          { /* implementation not shown */ }

          /** Returns a String with the time in the form hrs:mins:secs. */
          public String toString()
          { /* implementation not shown */ }
        }`,
        language: "java",
      },
    },
    code: `
      /** Outputs time t in the form hrs:mins: secs.
      */
      public void display (Time t)
      {
      /* method body * /
      }

      Which of the following are correct replacements for /* method body */?
      I.  Time T = new Time(h, m, s) ;
          System.outprintin(T);

      II. System.out.println(t.hrs + " : " + t.mins + ":" + t.secs);
      
      III. System.out.println(t);
    `,
    language: "java",
    options: [
      {
        text: "I Only",
      },
      {
        text: "II Only",
      },
      {
        text: "III Only",
      },
      {
        text: "II and III Only",
      },
      {
        text: "I, II and III"
      },
    ],
    correctAnswer: 2,
    explanationEN: "III is the only correct option. System.out.println(t) will implicitly call t.toString(), which returns the time in the correct format. Option I is incorrect because it creates a new Time object with undefined variables h, m, s. Option II is incorrect because it tries to access private instance variables directly.",
    explanationCN: "只有選項 III 是正確的。System.out.println(t) 會隱式調用 t.toString() 方法，該方法會返回正確格式的時間。選項 I 是錯誤的，因為它試圖用未定義的變量 h, m, s 創建新的 Time 對象。選項 II 是錯誤的，因為它試圖直接訪問私有實例變量。"
  }
];