# Still Out There — Scene 08: What Remains Asset Pack

This ZIP contains reference assets extracted from the supplied Scene 08 screenshot.

## Included
- `00_Original_Scene_Reference.png` — complete original screenshot.
- `01_Child_Astronaut_Transparent_APPROX.png` — approximate transparent cutout of the child astronaut.
- `02_Oppy_Rover_Transparent_APPROX.png` — approximate transparent cutout of Oppy.
- `03_Mars_Landscape_Background_Reference.png` — Mars landscape reference.
- `04_Oppy_Rover_Distant_Crop.png` — distant Oppy rover crop.
- `05_Evidence_Suitcase_Complete_Crop.png` — open evidence suitcase with cards.
- `06_Evidence_Card_Berries_Crop.png` — berries evidence card.
- `07_Evidence_Card_Hematite_Crop.png` — hematite evidence card.
- `08_Evidence_Card_Ancient_Water_Crop.png` — ancient-water evidence card.
- `09_Three_Evidence_Cards_Combined_Crop.png` — all three evidence cards together.
- `10_Scene_Title_Parchment_Crop.png` — scene title parchment.
- `11_Story_Conclusion_Text_Panel_Crop.png` — conclusion text panel.
- `12_Review_Case_File_Button_Crop.png` — review case file button.
- `13_Open_Sources_Button_Crop.png` — open sources button.
- `14_Restart_Investigation_Button_Crop.png` — restart button.
- `15_Top_Progress_And_Navigation_Crop.png` — progress/navigation reference.
- `16_Case_Title_Header.png` — case header.
- `17_Child_Reflective_Pose_Reference.png` — child pose reference.
- `18_Full_Conclusion_Layout_Crop.png` — full scene layout crop.

## Implementation notes
The screenshot is flattened, not a layered source file. The transparent character cutouts are approximate automatic extractions and may contain background remnants or lose fine edges. The other files are rectangular crops for visual reference and may include neighboring pixels.

For the live website, rebuild the suitcase, evidence cards, story panel, and buttons as independent React/CSS components. Wire the three buttons to: review the case file, open the verified NASA sources, and restart the investigation at the beginning. Keep the conclusion scientifically careful: Opportunity did not discover life; the evidence supports signs of ancient water in this area. Preserve the approved character design, rover design, and warm Mars palette.
