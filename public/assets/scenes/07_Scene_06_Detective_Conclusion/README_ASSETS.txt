# Still Out There — Scene 07: Detective Conclusion Asset Pack

This ZIP contains reference assets extracted from the supplied Scene 07 screenshot.

## Included files
- `00_Original_Scene_Reference.png` — complete original screenshot.
- `01_Child_Astronaut_Transparent_APPROX.png` — approximate transparent cutout of the child astronaut.
- `02_Oppy_Rover_Transparent_APPROX.png` — approximate transparent cutout of Oppy.
- `03_Mars_Landscape_Background_Reference.png` — Mars environment reference.
- `04_Evidence_Card_Berry_Pellets_Observed.png` — observed berries evidence card.
- `05_Evidence_Card_Hematite_Measurement.png` — hematite measurement evidence card.
- `06_Evidence_Card_Supports_Ancient_Water.png` — ancient-water evidence card.
- `07_Evidence_Card_Life_Not_Proven_Locked.png` — locked/not-proven life card.
- `08_Four_Evidence_Cards_Grid.png` — all four evidence cards together.
- `09_Investigation_Conclusion_Title_Parchment.png` — scene title.
- `10_Story_Explanation_Parchment.png` — explanatory text panel.
- `11_Key_Conclusion_Highlight.png` — highlighted conclusion.
- `12_Question_Prompt_Strip.png` — question prompt.
- `13_Answer_Option_Ancient_Water.png` — first answer option.
- `14_Answer_Option_Life_On_Mars.png` — second answer option.
- `15_Answer_Option_Water_Covered_All_Mars.png` — third answer option.
- `16_Select_Answer_Button.png` — answer button.
- `17_Top_Progress_And_Navigation.png` — progress and navigation reference.
- `18_Case_Title_Header.png` — case header.
- `19_Child_Thinking_Pose_Reference.png` — child pose reference.
- `20_Oppy_Rover_Illustration_Reference.png` — rover illustration crop.
- `21_Complete_Evidence_And_Question_Layout.png` — full layout crop.

## Implementation notes
The screenshot is flattened, not a layered design file. Transparent character cutouts are approximate automatic extractions and may have edge/background artifacts. Cropped panels are visual references and may include adjacent pixels.

For the actual website, implement the evidence cards, title, explanatory text, answer choices, selection state, and feedback as separate React/CSS/SVG elements rather than using the crops as a single static page. Keep the "life discovered" card visually locked/unconfirmed. The correct supported conclusion is that evidence in this area is associated with ancient water; it does not prove life on Mars or that all of Mars was covered by water. Keep the answer feedback explanatory even when a child chooses incorrectly.
