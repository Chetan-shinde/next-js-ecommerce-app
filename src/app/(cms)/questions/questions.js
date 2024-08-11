const questions = [
  {
    id: 100,
    que: "What is your gender?",
    que_type: "Gender",
    que_input_type: "RB",
    show: true,
    saved_ans: "",
    que_input_details: [
      {
        input_value: "Male",
        dep_que_show_list: [],
        dep_ques_hide_list: [],
        sub_ques_list: [
          {
            id: 103,
            que: "Give us more information",
            que_type: "Gender",
            que_input_type: "TA",
            show: true,
            saved_ans: "",
          },
        ],
      },
      {
        input_value: "Female",
        dep_que_show_list: [],
        dep_ques_hide_list: [],
        sub_ques_list: [],
      },
    ],
  },
  {
    id: 101,
    que: "What is your blood pressure?",
    que_type: "Specific",
    que_input_type: "CO",
    show: true,
    saved_ans: "",
    que_input_details: [
      {
        input_value: "Normal",
        dep_que_show_list: [],
        dep_ques_hide_list: [],
        sub_ques_list: [],
      },
      {
        input_value: "Below 90",
        dep_que_show_list: [],
        dep_ques_hide_list: [],
        sub_ques_list: [],
      },
      {
        input_value: "Above 90",
        dep_que_show_list: [],
        dep_ques_hide_list: [],
        sub_ques_list: [],
      },
    ],
  },
  {
    id: 102,
    que: "Are u disabled?",
    que_type: "Specific",
    que_input_type: "RB",
    show: true,
    saved_ans: "",
    que_input_details: [
      {
        input_value: "Yes",
        dep_que_show_list: [],
        dep_ques_hide_list: [],
        sub_ques_list: [],
      },
      {
        input_value: "No",
        dep_que_show_list: [],
        dep_ques_hide_list: [],
        sub_ques_list: [],
      },
    ],
  },
  {
    id: 104,
    que: "Please upload your image?",
    que_type: "Specific",
    que_input_type: "IMG",
    show: true,
    saved_ans: "",
    que_input_details: [],
  },
];

export default questions;
