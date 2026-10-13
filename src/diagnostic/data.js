// GCSE-DIAG v1.0. Original diagnostic content. Browser-side keys are inspectable.
export const assessments = {
  "F": {
    "assessment_id": "GCSE-DIAG-F-v1.0",
    "tier": "Foundation",
    "suggested_minutes": [
      30,
      30
    ],
    "calculator_from_question": 10,
    "total_marks": 24,
    "questions": [
      {
        "number": 1,
        "prompt": "Work out each answer without a calculator.",
        "items": [
          {
            "code": "1a",
            "skill": "negative_numbers",
            "type": "number",
            "answer": 5,
            "marks": 1,
            "solution": "−7 + 12 = 5.",
            "feedback_if_incorrect": "Practise adding and subtracting across zero.",
            "prerequisite": true,
            "resource_key": "negative_numbers",
            "resource_url": null,
            "prompt": "(a) −7 + 12",
            "response_id": "F-1a"
          },
          {
            "code": "1b",
            "skill": "order_of_operations",
            "type": "number",
            "answer": -7,
            "marks": 1,
            "solution": "Multiply first: 3 − 2 × 5 = 3 − 10 = −7.",
            "feedback_if_incorrect": "Check the order of operations: multiply before subtracting.",
            "prerequisite": true,
            "resource_key": "order_of_operations",
            "resource_url": null,
            "prompt": "(b) 3 − 2 × 5",
            "response_id": "F-1b"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Number",
        "question_id": "F-1"
      },
      {
        "number": 2,
        "prompt": "Work out 2/3 + 1/4.<br/>Give your answer as a fraction.",
        "items": [
          {
            "code": "2",
            "skill": "adding_fractions",
            "type": "fraction",
            "answer": "11/12",
            "marks": 1,
            "solution": "Use twelfths: 8/12 + 3/12 = 11/12.",
            "feedback_if_incorrect": "Revisit equivalent fractions and common denominators.",
            "prerequisite": true,
            "resource_key": "adding_fractions",
            "resource_url": null,
            "response_id": "F-2"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Number",
        "question_id": "F-2"
      },
      {
        "number": 3,
        "prompt": "A coat costs £60. Its price is reduced by 15%.<br/>Work out the sale price.",
        "items": [
          {
            "code": "3",
            "skill": "percentage_decrease",
            "type": "number",
            "answer": 51,
            "marks": 1,
            "solution": "15% of £60 is £9; £60 − £9 = £51.",
            "feedback_if_incorrect": "Find the percentage reduction, then subtract it from the original price.",
            "prerequisite": true,
            "resource_key": "percentage_decrease",
            "resource_url": null,
            "unit": "£",
            "response_id": "F-3"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Number",
        "question_id": "F-3"
      },
      {
        "number": 4,
        "prompt": "Solve each equation.",
        "items": [
          {
            "code": "4a",
            "skill": "linear_equations",
            "type": "number",
            "answer": 6,
            "marks": 1,
            "solution": "4x + 7 = 31 gives 4x = 24, so x = 6.",
            "feedback_if_incorrect": "Practise inverse operations to isolate the unknown.",
            "prerequisite": true,
            "resource_key": "linear_equations",
            "resource_url": null,
            "prompt": "(a) 4x + 7 = 31",
            "response_id": "F-4a"
          },
          {
            "code": "4b",
            "skill": "linear_equations",
            "type": "number",
            "answer": 7,
            "marks": 1,
            "solution": "5x − 8 = 2x + 13 gives 3x = 21, so x = 7.",
            "feedback_if_incorrect": "Practise collecting the unknown on one side before solving.",
            "prerequisite": true,
            "resource_key": "linear_equations",
            "resource_url": null,
            "prompt": "(b) 5x − 8 = 2x + 13",
            "response_id": "F-4b"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Algebra",
        "question_id": "F-4"
      },
      {
        "number": 5,
        "prompt": "Expand 3(2x − 5).<br/>Circle the correct answer.",
        "items": [
          {
            "code": "5",
            "skill": "expanding_brackets",
            "type": "choice",
            "answer": "B",
            "marks": 1,
            "solution": "Multiply both terms by 3: 6x − 15.",
            "feedback_if_incorrect": "Multiply every term inside the bracket; keep the negative sign.",
            "prerequisite": true,
            "resource_key": "expanding_brackets",
            "resource_url": null,
            "response_id": "F-5"
          }
        ],
        "diagram": null,
        "table": null,
        "options": [
          "A   6x − 5",
          "B   6x − 15",
          "C   5x − 15",
          "D   6x + 15"
        ],
        "domain": "Algebra",
        "question_id": "F-5"
      },
      {
        "number": 6,
        "prompt": "The first four terms of a sequence are 5, 8, 11, 14.<br/>The first term has n = 1. Circle its nth-term rule.",
        "items": [
          {
            "code": "6",
            "skill": "linear_sequences",
            "type": "choice",
            "answer": "A",
            "marks": 1,
            "solution": "The difference is 3. Since 3n starts at 3, add 2: 3n + 2.",
            "feedback_if_incorrect": "Find the common difference, then check the rule at n = 1.",
            "prerequisite": false,
            "resource_key": "linear_sequences",
            "resource_url": null,
            "response_id": "F-6"
          }
        ],
        "diagram": null,
        "table": null,
        "options": [
          "A   3n + 2",
          "B   3n + 5",
          "C   5n + 3",
          "D   n + 3"
        ],
        "domain": "Algebra",
        "question_id": "F-6"
      },
      {
        "number": 7,
        "prompt": "Answer these two ratio questions.",
        "items": [
          {
            "code": "7a",
            "skill": "ratio",
            "type": "number",
            "answer": 40,
            "marks": 1,
            "solution": "3 + 5 = 8 parts; £64 ÷ 8 = £8 per part; 5 × £8 = £40.",
            "feedback_if_incorrect": "Divide by the total number of ratio parts, then multiply by the required parts.",
            "prerequisite": true,
            "resource_key": "ratio",
            "resource_url": null,
            "prompt": "(a) £64 is shared in the ratio 3 : 5. Find the larger share.",
            "unit": "£",
            "response_id": "F-7a"
          },
          {
            "code": "7b",
            "skill": "ratio",
            "type": "number",
            "answer": 30,
            "marks": 1,
            "solution": "18 ÷ 3 = 6, so the number of blue counters is 5 × 6 = 30.",
            "feedback_if_incorrect": "Use the same scale factor for both parts of a ratio.",
            "prerequisite": true,
            "resource_key": "ratio",
            "resource_url": null,
            "prompt": "(b) Red : blue counters = 3 : 5. There are 18 red counters. How many blue counters are there?",
            "response_id": "F-7b"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Ratio and proportion",
        "question_id": "F-7"
      },
      {
        "number": 8,
        "prompt": "A recipe for 4 people uses 300 g of flour.<br/>How much flour is needed for 10 people?",
        "items": [
          {
            "code": "8",
            "skill": "direct_proportion",
            "type": "number",
            "answer": 750,
            "marks": 1,
            "solution": "300 ÷ 4 = 75 g per person; 75 × 10 = 750 g.",
            "feedback_if_incorrect": "Find the amount for one person, then scale up.",
            "prerequisite": true,
            "resource_key": "direct_proportion",
            "resource_url": null,
            "unit": "g",
            "response_id": "F-8"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Ratio and proportion",
        "question_id": "F-8"
      },
      {
        "number": 9,
        "prompt": "A car travels 135 km in 1.5 hours.<br/>Work out its average speed in km/h.<br/><font size=\"9\">You may use: average speed = distance ÷ time.</font>",
        "items": [
          {
            "code": "9",
            "skill": "speed",
            "type": "number",
            "answer": 90,
            "marks": 1,
            "solution": "135 ÷ 1.5 = 90 km/h.",
            "feedback_if_incorrect": "Divide distance by time, using consistent units.",
            "prerequisite": false,
            "resource_key": "speed",
            "resource_url": null,
            "unit": "km/h",
            "response_id": "F-9"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Ratio and proportion",
        "question_id": "F-9"
      },
      {
        "number": 10,
        "prompt": "Use angle facts to find the missing angles.",
        "items": [
          {
            "code": "10a",
            "skill": "angle_facts",
            "type": "number",
            "answer": 75,
            "marks": 1,
            "solution": "180° − 37° − 68° = 75°.",
            "feedback_if_incorrect": "Use the 180° angle sum of a triangle.",
            "prerequisite": true,
            "resource_key": "angle_facts",
            "resource_url": null,
            "prompt": "(a) A triangle has angles 37°, 68° and x°. Find x.",
            "unit": "°",
            "response_id": "F-10a"
          },
          {
            "code": "10b",
            "skill": "angle_facts",
            "type": "number",
            "answer": 125,
            "marks": 1,
            "solution": "360° − 90° − 145° = 125°.",
            "feedback_if_incorrect": "Use the 360° angle sum around a point.",
            "prerequisite": true,
            "resource_key": "angle_facts",
            "resource_url": null,
            "prompt": "(b) Three angles around a point are 90°, 145° and y°. Find y.",
            "unit": "°",
            "response_id": "F-10b"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Geometry and measures",
        "question_id": "F-10"
      },
      {
        "number": 11,
        "prompt": "A 3 cm by 2 cm rectangle is removed from the top-right<br/>corner of an 8 cm by 5 cm rectangle.<br/>Find the area of the remaining shape.",
        "items": [
          {
            "code": "11",
            "skill": "compound_area",
            "type": "number",
            "answer": 34,
            "marks": 1,
            "solution": "8 × 5 − 3 × 2 = 40 − 6 = 34 cm².",
            "feedback_if_incorrect": "Calculate the whole rectangle area, then subtract the removed area.",
            "prerequisite": true,
            "resource_key": "compound_area",
            "resource_url": null,
            "unit": "cm²",
            "response_id": "F-11"
          }
        ],
        "diagram": "L",
        "table": null,
        "options": null,
        "domain": "Geometry and measures",
        "question_id": "F-11"
      },
      {
        "number": 12,
        "prompt": "Find the length of the hypotenuse x.",
        "items": [
          {
            "code": "12",
            "skill": "pythagoras",
            "type": "number",
            "answer": 10,
            "marks": 1,
            "solution": "x² = 6² + 8² = 100, so x = 10 cm.",
            "feedback_if_incorrect": "Add the squares of the shorter sides, then take the square root.",
            "prerequisite": true,
            "resource_key": "pythagoras",
            "resource_url": null,
            "unit": "cm",
            "response_id": "F-12"
          }
        ],
        "diagram": "right",
        "table": null,
        "options": null,
        "domain": "Geometry and measures",
        "question_id": "F-12"
      },
      {
        "number": 13,
        "prompt": "A bag contains 3 red, 5 blue and 2 green counters.<br/>One counter is chosen at random.",
        "items": [
          {
            "code": "13a",
            "skill": "single_probability",
            "type": "fraction",
            "answer": "1/2",
            "marks": 1,
            "solution": "There are 10 counters. P(blue) = 5/10 = 1/2.",
            "feedback_if_incorrect": "Divide the number of favourable outcomes by the total.",
            "prerequisite": true,
            "resource_key": "single_probability",
            "resource_url": null,
            "prompt": "(a) Find the probability that it is blue.",
            "response_id": "F-13a"
          },
          {
            "code": "13b",
            "skill": "complement_probability",
            "type": "fraction",
            "answer": "4/5",
            "marks": 1,
            "solution": "8 of the 10 counters are not green, so P(not green) = 8/10 = 4/5.",
            "feedback_if_incorrect": "Use 1 minus the probability of the unwanted outcome.",
            "prerequisite": true,
            "resource_key": "complement_probability",
            "resource_url": null,
            "prompt": "(b) Find the probability that it is not green.",
            "response_id": "F-13b"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Probability",
        "question_id": "F-13"
      },
      {
        "number": 14,
        "prompt": "The probability that a spinner lands on yellow is 0.3.<br/>It is spun 60 times. How many times would you expect<br/>it to land on yellow?",
        "items": [
          {
            "code": "14",
            "skill": "expected_frequency",
            "type": "number",
            "answer": 18,
            "marks": 1,
            "solution": "Expected frequency = 60 × 0.3 = 18.",
            "feedback_if_incorrect": "Multiply the probability by the number of trials.",
            "prerequisite": false,
            "resource_key": "expected_frequency",
            "resource_url": null,
            "response_id": "F-14"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Probability",
        "question_id": "F-14"
      },
      {
        "number": 15,
        "prompt": "Two fair coins are tossed.<br/>Find the probability that both show heads.",
        "items": [
          {
            "code": "15",
            "skill": "independent_probability",
            "type": "fraction",
            "answer": "1/4",
            "marks": 1,
            "solution": "HH, HT, TH and TT are equally likely; one of four is HH.",
            "feedback_if_incorrect": "List the possible outcomes or multiply the two probabilities.",
            "prerequisite": false,
            "resource_key": "independent_probability",
            "resource_url": null,
            "response_id": "F-15"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Probability",
        "question_id": "F-15"
      },
      {
        "number": 16,
        "prompt": "The table shows the number of books read by a group of students.",
        "items": [
          {
            "code": "16a",
            "skill": "frequency_totals",
            "type": "number",
            "answer": 10,
            "marks": 1,
            "solution": "1 + 3 + 2 + 4 = 10 students.",
            "feedback_if_incorrect": "Add the frequencies to find how many values there are.",
            "prerequisite": true,
            "resource_key": "frequency_totals",
            "resource_url": null,
            "prompt": "(a) Find the total frequency.",
            "response_id": "F-16a"
          },
          {
            "code": "16b",
            "skill": "frequency_mean",
            "type": "number",
            "answer": 1.9,
            "marks": 1,
            "solution": "Total books = 0×1 + 1×3 + 2×2 + 3×4 = 19; mean = 19/10 = 1.9.",
            "feedback_if_incorrect": "Multiply each value by its frequency, add, then divide by total frequency.",
            "prerequisite": false,
            "resource_key": "mean_from_frequency_table",
            "resource_url": null,
            "prompt": "(b) Work out the mean number of books read.",
            "response_id": "F-16b"
          }
        ],
        "diagram": null,
        "table": [
          [
            "Books",
            "0",
            "1",
            "2",
            "3"
          ],
          [
            "Frequency",
            "1",
            "3",
            "2",
            "4"
          ]
        ],
        "options": null,
        "domain": "Statistics",
        "question_id": "F-16"
      },
      {
        "number": 17,
        "prompt": "Here are six numbers in order:<br/>2, 4, 4, 7, 8, 11<br/>Find their median.",
        "items": [
          {
            "code": "17",
            "skill": "median",
            "type": "number",
            "answer": 5.5,
            "marks": 1,
            "solution": "The middle two numbers are 4 and 7; their mean is 5.5.",
            "feedback_if_incorrect": "For an even number of values, average the two middle values.",
            "prerequisite": false,
            "resource_key": "median",
            "resource_url": null,
            "response_id": "F-17"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Statistics",
        "question_id": "F-17"
      },
      {
        "number": 18,
        "prompt": "Five numbers have a mean of 8.<br/>Four of the numbers are 6, 7, 9 and 10.<br/>Find the missing number.",
        "items": [
          {
            "code": "18",
            "skill": "reverse_mean",
            "type": "number",
            "answer": 8,
            "marks": 1,
            "solution": "The total is 5 × 8 = 40; known values total 32; missing number = 8.",
            "feedback_if_incorrect": "Use mean × number of values to find the total, then subtract known values.",
            "prerequisite": false,
            "resource_key": "reverse_mean",
            "resource_url": null,
            "response_id": "F-18"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Statistics",
        "question_id": "F-18"
      }
    ]
  },
  "H": {
    "assessment_id": "GCSE-DIAG-H-v1.0",
    "tier": "Higher",
    "suggested_minutes": [
      35,
      40
    ],
    "calculator_from_question": 10,
    "total_marks": 24,
    "questions": [
      {
        "number": 1,
        "prompt": "Work out each answer without a calculator.<br/>Give your answers as fractions.",
        "items": [
          {
            "code": "1a",
            "skill": "adding_fractions",
            "type": "fraction",
            "answer": "11/12",
            "marks": 1,
            "solution": "2/3 + 1/4 = 8/12 + 3/12 = 11/12.",
            "feedback_if_incorrect": "Revisit equivalent fractions and common denominators.",
            "prerequisite": true,
            "resource_key": "adding_fractions",
            "resource_url": null,
            "prompt": "(a) 2/3 + 1/4",
            "response_id": "H-1a"
          },
          {
            "code": "1b",
            "skill": "dividing_fractions",
            "type": "fraction",
            "answer": "9/10",
            "marks": 1,
            "solution": "3/4 ÷ 5/6 = 3/4 × 6/5 = 18/20 = 9/10.",
            "feedback_if_incorrect": "Multiply by the reciprocal of the second fraction.",
            "prerequisite": true,
            "resource_key": "dividing_fractions",
            "resource_url": null,
            "prompt": "(b) 3/4 ÷ 5/6",
            "response_id": "H-1b"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Number",
        "question_id": "H-1"
      },
      {
        "number": 2,
        "prompt": "Which option writes 0.000072 in standard form?<br/>Circle one answer.",
        "items": [
          {
            "code": "2",
            "skill": "standard_form",
            "type": "choice",
            "answer": "B",
            "marks": 1,
            "solution": "7.2 × 10⁻⁵ is equal to 0.000072 and its coefficient is between 1 and 10.",
            "feedback_if_incorrect": "Check both the power of ten and the coefficient: it must be at least 1 and less than 10.",
            "prerequisite": false,
            "resource_key": "standard_form",
            "resource_url": null,
            "response_id": "H-2"
          }
        ],
        "diagram": null,
        "table": null,
        "options": [
          "A   0.72 × 10⁻⁴",
          "B   7.2 × 10⁻⁵",
          "C   72 × 10⁻⁶",
          "D   7.2 × 10⁵"
        ],
        "domain": "Number",
        "question_id": "H-2"
      },
      {
        "number": 3,
        "prompt": "After a 15% reduction, a coat costs £68.<br/>Work out its original price.",
        "items": [
          {
            "code": "3",
            "skill": "reverse_percentages",
            "type": "number",
            "answer": 80,
            "marks": 1,
            "solution": "£68 represents 85%; original price = 68 ÷ 0.85 = £80.",
            "feedback_if_incorrect": "Identify the remaining percentage and divide by its decimal multiplier.",
            "prerequisite": true,
            "resource_key": "reverse_percentages",
            "resource_url": null,
            "unit": "£",
            "response_id": "H-3"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Number",
        "question_id": "H-3"
      },
      {
        "number": 4,
        "prompt": "Solve the equations.",
        "items": [
          {
            "code": "4a",
            "skill": "linear_equations",
            "type": "number",
            "answer": 7,
            "marks": 1,
            "solution": "5x − 8 = 2x + 13 gives 3x = 21, so x = 7.",
            "feedback_if_incorrect": "Collect the unknown on one side before solving.",
            "prerequisite": true,
            "resource_key": "linear_equations",
            "resource_url": null,
            "prompt": "(a) 5x − 8 = 2x + 13",
            "response_id": "H-4a"
          },
          {
            "code": "4b",
            "skill": "quadratic_roots",
            "type": "unordered_pair",
            "answer": [
              -1,
              4
            ],
            "marks": 1,
            "solution": "x − 4 = 0 or x + 1 = 0, so x = 4 or x = −1.",
            "feedback_if_incorrect": "Set each factor equal to zero to find both roots.",
            "prerequisite": false,
            "resource_key": "quadratic_roots",
            "resource_url": null,
            "prompt": "(b) (x − 4)(x + 1) = 0. Give both solutions.",
            "response_id": "H-4b"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Algebra",
        "question_id": "H-4"
      },
      {
        "number": 5,
        "prompt": "Complete the square by finding a and b.<br/>x² + 6x + 5 = (x + a)² + b",
        "items": [
          {
            "code": "5",
            "skill": "completing_the_square",
            "type": "ordered_pair",
            "answer": [
              3,
              -4
            ],
            "marks": 1,
            "solution": "(x + 3)² = x² + 6x + 9, so subtract 4. Thus a = 3, b = −4.",
            "feedback_if_incorrect": "Halve the coefficient of x, then adjust the constant after expanding.",
            "prerequisite": false,
            "resource_key": "completing_the_square",
            "resource_url": null,
            "labels": [
              "a",
              "b"
            ],
            "response_id": "H-5"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Algebra",
        "question_id": "H-5"
      },
      {
        "number": 6,
        "prompt": "Solve the equation.<br/>3/(x − 1) = 2/(x + 2)<br/><font size=\"9\">x ≠ 1 and x ≠ −2</font>",
        "items": [
          {
            "code": "6",
            "skill": "algebraic_fractions",
            "type": "number",
            "answer": -8,
            "marks": 1,
            "solution": "3(x + 2) = 2(x − 1); 3x + 6 = 2x − 2; x = −8. This is permitted.",
            "feedback_if_incorrect": "Multiply through by both denominators and solve the resulting linear equation.",
            "prerequisite": false,
            "resource_key": "algebraic_fractions",
            "resource_url": null,
            "response_id": "H-6"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Algebra",
        "question_id": "H-6"
      },
      {
        "number": 7,
        "prompt": "Answer these two ratio questions.",
        "items": [
          {
            "code": "7a",
            "skill": "ratio",
            "type": "number",
            "answer": 40,
            "marks": 1,
            "solution": "8 equal parts total £64, so each is £8; 5 parts = £40.",
            "feedback_if_incorrect": "Divide by total ratio parts, then multiply by the required parts.",
            "prerequisite": true,
            "resource_key": "ratio",
            "resource_url": null,
            "prompt": "(a) £64 is shared in the ratio 3 : 5. Find the larger share.",
            "unit": "£",
            "response_id": "H-7a"
          },
          {
            "code": "7b",
            "skill": "ratio",
            "type": "number",
            "answer": 30,
            "marks": 1,
            "solution": "18 red counters represent 3 parts, so 1 part is 6 and 5 parts are 30.",
            "feedback_if_incorrect": "Scale both parts of the ratio by the same factor.",
            "prerequisite": true,
            "resource_key": "ratio",
            "resource_url": null,
            "prompt": "(b) Red : blue counters = 3 : 5. There are 18 red counters. How many blue counters are there?",
            "response_id": "H-7b"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Ratio and proportion",
        "question_id": "H-7"
      },
      {
        "number": 8,
        "prompt": "y is inversely proportional to x².<br/>When x = 2, y = 18. Find y when x = 3.",
        "items": [
          {
            "code": "8",
            "skill": "inverse_proportion",
            "type": "number",
            "answer": 8,
            "marks": 1,
            "solution": "y = k/x²; k = 18 × 4 = 72; y = 72/9 = 8.",
            "feedback_if_incorrect": "Find the constant in y = k/x², then substitute the new x value.",
            "prerequisite": false,
            "resource_key": "inverse_proportion",
            "resource_url": null,
            "response_id": "H-8"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Ratio and proportion",
        "question_id": "H-8"
      },
      {
        "number": 9,
        "prompt": "Two shapes are mathematically similar.<br/>Their corresponding side lengths are in the ratio 2 : 3.<br/>The smaller shape has area 40 cm².<br/>Find the area of the larger shape.",
        "items": [
          {
            "code": "9",
            "skill": "area_scale_factor",
            "type": "number",
            "answer": 90,
            "marks": 1,
            "solution": "Length scale factor = 3/2. Area scale factor = (3/2)² = 9/4; area = 90 cm².",
            "feedback_if_incorrect": "Square the length scale factor when scaling area.",
            "prerequisite": false,
            "resource_key": "area_scale_factor",
            "resource_url": null,
            "unit": "cm²",
            "response_id": "H-9"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Ratio and proportion",
        "question_id": "H-9"
      },
      {
        "number": 10,
        "prompt": "Use the right-angled triangle.",
        "items": [
          {
            "code": "10a",
            "skill": "pythagoras",
            "type": "number",
            "answer": 10,
            "marks": 1,
            "solution": "x = √(6² + 8²) = √100 = 10 cm.",
            "feedback_if_incorrect": "Add the squares of the two shorter sides and take the square root.",
            "prerequisite": true,
            "resource_key": "pythagoras",
            "resource_url": null,
            "prompt": "(a) Find the hypotenuse x.",
            "unit": "cm",
            "response_id": "H-10a"
          },
          {
            "code": "10b",
            "skill": "right_triangle_trigonometry",
            "type": "rounded",
            "answer": 36.9,
            "marks": 1,
            "solution": "tan θ = 6/8; θ = tan⁻¹(0.75) = 36.869...°, which rounds to 36.9°.",
            "feedback_if_incorrect": "Identify opposite and adjacent, then use inverse tangent in degree mode.",
            "prerequisite": false,
            "resource_key": "right_triangle_trigonometry",
            "resource_url": null,
            "prompt": "(b) Find θ. Give your answer to 1 decimal place.",
            "unit": "°",
            "decimals": 1,
            "response_id": "H-10b"
          }
        ],
        "diagram": "right_angle",
        "table": null,
        "options": null,
        "domain": "Geometry and measures",
        "question_id": "H-10"
      },
      {
        "number": 11,
        "prompt": "O is the centre of the circle. A, B and P lie on the circle.<br/>Angle AOB = 104°. Find angle APB, labelled x.",
        "items": [
          {
            "code": "11",
            "skill": "circle_theorems",
            "type": "number",
            "answer": 52,
            "marks": 1,
            "solution": "The angle at the circumference is half the angle at the centre subtended by the same arc: 104°/2 = 52°.",
            "feedback_if_incorrect": "Match the angles subtended by the same arc, then use the centre/circumference theorem.",
            "prerequisite": false,
            "resource_key": "circle_theorems",
            "resource_url": null,
            "unit": "°",
            "response_id": "H-11"
          }
        ],
        "diagram": "circle",
        "table": null,
        "options": null,
        "domain": "Geometry and measures",
        "question_id": "H-11"
      },
      {
        "number": 12,
        "prompt": "Find the side x in this triangle.<br/>Give your answer to 3 significant figures.",
        "items": [
          {
            "code": "12",
            "skill": "cosine_rule",
            "type": "rounded",
            "answer": 8.19,
            "marks": 1,
            "solution": "x² = 7² + 9² − 2×7×9×cos 60° = 67; x = √67 = 8.185... = 8.19 cm.",
            "feedback_if_incorrect": "Use the cosine rule with the included angle, then take the square root.",
            "prerequisite": false,
            "resource_key": "cosine_rule",
            "resource_url": null,
            "unit": "cm",
            "decimals": 2,
            "response_id": "H-12"
          }
        ],
        "diagram": "cosine",
        "table": null,
        "options": null,
        "domain": "Geometry and measures",
        "question_id": "H-12"
      },
      {
        "number": 13,
        "prompt": "A bag contains 5 red and 3 blue counters.",
        "items": [
          {
            "code": "13a",
            "skill": "single_probability",
            "type": "fraction",
            "answer": "5/8",
            "marks": 1,
            "solution": "There are 8 counters, including 5 red, so the probability is 5/8.",
            "feedback_if_incorrect": "Divide favourable outcomes by total outcomes.",
            "prerequisite": true,
            "resource_key": "single_probability",
            "resource_url": null,
            "prompt": "(a) One counter is chosen at random. Find P(red).",
            "response_id": "H-13a"
          },
          {
            "code": "13b",
            "skill": "without_replacement",
            "type": "fraction",
            "answer": "5/14",
            "marks": 1,
            "solution": "P(two red) = 5/8 × 4/7 = 20/56 = 5/14.",
            "feedback_if_incorrect": "After the first red counter, reduce both the red count and the total.",
            "prerequisite": false,
            "resource_key": "without_replacement",
            "resource_url": null,
            "prompt": "(b) Two counters are chosen at random without replacement. Find the probability that both are red.",
            "response_id": "H-13b"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Probability",
        "question_id": "H-13"
      },
      {
        "number": 14,
        "prompt": "A and B are mutually exclusive events.<br/>P(A) = 0.35 and P(B) = 0.40.<br/>Find the probability that neither event happens.",
        "items": [
          {
            "code": "14",
            "skill": "combined_probability",
            "type": "number",
            "answer": 0.25,
            "marks": 1,
            "solution": "P(A or B) = 0.35 + 0.40 = 0.75; P(neither) = 1 − 0.75 = 0.25.",
            "feedback_if_incorrect": "Add mutually exclusive probabilities, then use the complement.",
            "prerequisite": false,
            "resource_key": "combined_probability",
            "resource_url": null,
            "response_id": "H-14"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Probability",
        "question_id": "H-14"
      },
      {
        "number": 15,
        "prompt": "Two fair six-sided dice, each numbered 1 to 6, are rolled.<br/>Find the probability that their total is greater than 9.",
        "items": [
          {
            "code": "15",
            "skill": "sample_space",
            "type": "fraction",
            "answer": "1/6",
            "marks": 1,
            "solution": "Of 36 equally likely ordered outcomes, totals 10, 11, 12 occur in 3 + 2 + 1 = 6 ways. Probability = 6/36 = 1/6.",
            "feedback_if_incorrect": "List ordered outcomes systematically; different totals are not equally likely.",
            "prerequisite": false,
            "resource_key": "sample_space",
            "resource_url": null,
            "response_id": "H-15"
          }
        ],
        "diagram": null,
        "table": null,
        "options": null,
        "domain": "Probability",
        "question_id": "H-15"
      },
      {
        "number": 16,
        "prompt": "The table shows the number of books read by a group of students.",
        "items": [
          {
            "code": "16a",
            "skill": "frequency_mean",
            "type": "number",
            "answer": 1.9,
            "marks": 1,
            "solution": "Total books = 0×1 + 1×3 + 2×2 + 3×4 = 19; mean = 19/10 = 1.9.",
            "feedback_if_incorrect": "Use the sum of value × frequency, divided by total frequency.",
            "prerequisite": false,
            "resource_key": "mean_from_frequency_table",
            "resource_url": null,
            "prompt": "(a) Work out the mean number of books read.",
            "response_id": "H-16a"
          },
          {
            "code": "16b",
            "skill": "median",
            "type": "number",
            "answer": 2,
            "marks": 1,
            "solution": "The 5th and 6th values are both 2, so the median is 2.",
            "feedback_if_incorrect": "Use cumulative frequencies to locate the middle values.",
            "prerequisite": false,
            "resource_key": "median",
            "resource_url": null,
            "prompt": "(b) Find the median number of books read.",
            "response_id": "H-16b"
          }
        ],
        "diagram": null,
        "table": [
          [
            "Books",
            "0",
            "1",
            "2",
            "3"
          ],
          [
            "Frequency",
            "1",
            "3",
            "2",
            "4"
          ]
        ],
        "options": null,
        "domain": "Statistics",
        "question_id": "H-16"
      },
      {
        "number": 17,
        "prompt": "The table shows travel times for 10 students.<br/>Use class midpoints to estimate the mean travel time.",
        "items": [
          {
            "code": "17",
            "skill": "grouped_mean",
            "type": "number",
            "answer": 16,
            "marks": 1,
            "solution": "Midpoints are 5, 15, 25. Estimated total = 5×2 + 15×5 + 25×3 = 160; estimated mean = 16 minutes.",
            "feedback_if_incorrect": "Multiply each class midpoint by its frequency, then divide the total by total frequency.",
            "prerequisite": false,
            "resource_key": "grouped_mean",
            "resource_url": null,
            "unit": "minutes",
            "response_id": "H-17"
          }
        ],
        "diagram": null,
        "table": [
          [
            "Time t (minutes)",
            "Frequency"
          ],
          [
            "0 ≤ t < 10",
            "2"
          ],
          [
            "10 ≤ t < 20",
            "5"
          ],
          [
            "20 ≤ t < 30",
            "3"
          ]
        ],
        "options": null,
        "domain": "Statistics",
        "question_id": "H-17"
      },
      {
        "number": 18,
        "prompt": "Two teams complete the same task. Their times are summarised below.<br/>Which comparison is supported by both statistics? Circle one answer.",
        "items": [
          {
            "code": "18",
            "skill": "comparing_distributions",
            "type": "choice",
            "answer": "C",
            "marks": 1,
            "solution": "Team A has the lower median (less time typically) and smaller IQR (more consistent times).",
            "feedback_if_incorrect": "Compare typical values using the median and spread using the interquartile range.",
            "prerequisite": false,
            "resource_key": "comparing_distributions",
            "resource_url": null,
            "response_id": "H-18"
          }
        ],
        "diagram": null,
        "table": [
          [
            "Team",
            "Median (s)",
            "IQR (s)"
          ],
          [
            "A",
            "35",
            "6"
          ],
          [
            "B",
            "40",
            "14"
          ]
        ],
        "options": [
          "A   A generally takes longer and is more consistent.",
          "B   B generally takes longer and is more consistent.",
          "C   A generally takes less time and is more consistent.",
          "D   A generally takes less time and is less consistent."
        ],
        "domain": "Statistics",
        "question_id": "H-18"
      }
    ]
  }
};

// Only verified, relevant pages with existing content are linked.
export const resourceLinks = {
  pythagoras:{slug:'pythagoras',label:'Pythagoras: topic notes & practice'},
  right_triangle_trigonometry:{slug:'sohcahtoa',label:'SOHCAHTOA: practice & worked answers'},
  circle_theorems:{slug:'circle-theorems',label:'Circle theorems: Higher practice'},
  cosine_rule:{slug:'cosine-rule',label:'Cosine rule: topic notes & exam questions'},
  completing_the_square:{slug:'completing-the-square',label:'Completing the square: notes & exam questions'},
  mean_from_frequency_table:{slug:'averages-from-frequency-tables',label:'Mean from frequency tables: video & practice'},
  grouped_mean:{slug:'averages-from-frequency-tables',label:'Estimated mean: notes & practice'},
  frequency_totals:{slug:'averages-from-frequency-tables',label:'Frequency tables: video & practice'},
  median:{slug:'median',label:'Median: topic notes & practice'},
  without_replacement:{slug:'probability-trees',label:'Probability trees: topic notes'},
  independent_probability:{slug:'probability-trees',label:'Probability trees: topic notes'}
};
