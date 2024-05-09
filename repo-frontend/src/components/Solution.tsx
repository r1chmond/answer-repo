
function Solution(){
  const solutions = [
    {
      book: "Software Architecture", 
      chapter_title: "Introduction to Software Architecture",
      chapter_number: 1, 
      exercise_number: "1", 
      answer: "Possible styles include MVC, MVVM"
    },
    {
      book: "Software Architecture", 
      chapter_title: "Application Tiers",
      chapter_number: 2, 
      exercise_number: "1", 
      answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap"
    },
    {
      book: "Software Architecture", 
      chapter_title: "Mobile Architectures",
      chapter_number: 3, 
      exercise_number: "1", 
      answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap"
    }
  ];

  return <ul className="list-group">
  {solutions.map(solution => (
    <li className="list-group-item" key={solution.chapter_number}>
        {solution.chapter_title}
      </li>
    ))}
  </ul>

}

export default Solution;
