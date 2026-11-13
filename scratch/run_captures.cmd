@echo off
set CHROME="C:\Program Files\Google\Chrome\Application\chrome.exe"
set DIST="file:///D:/Downloads/nasa/dist/index.html"
set OUT="D:\Downloads\nasa\verification_screenshots"

echo Capturing Scene 1...
%CHROME% --headless=new --disable-gpu --no-sandbox --allow-file-access-from-files --window-size=1600,900 --virtual-time-budget=2500 --screenshot="%OUT%\02_Scene_01_Mysterious_Image.png" "%DIST%?scene=1"

echo Capturing Scene 2...
%CHROME% --headless=new --disable-gpu --no-sandbox --allow-file-access-from-files --window-size=1600,900 --virtual-time-budget=2500 --screenshot="%OUT%\03_Scene_02_Who_is_Oppy.png" "%DIST%?scene=2"

echo Capturing Scene 3...
%CHROME% --headless=new --disable-gpu --no-sandbox --allow-file-access-from-files --window-size=1600,900 --virtual-time-budget=2500 --screenshot="%OUT%\04_Scene_03_Berry_Bowl.png" "%DIST%?scene=3"

echo Capturing Scene 4...
%CHROME% --headless=new --disable-gpu --no-sandbox --allow-file-access-from-files --window-size=1600,900 --virtual-time-budget=2500 --screenshot="%OUT%\05_Scene_04_Inspect_the_Tools.png" "%DIST%?scene=4"

echo Capturing Scene 5...
%CHROME% --headless=new --disable-gpu --no-sandbox --allow-file-access-from-files --window-size=1600,900 --virtual-time-budget=2500 --screenshot="%OUT%\06_Scene_05_Compare_the_Evidence.png" "%DIST%?scene=5"

echo Capturing Scene 6...
%CHROME% --headless=new --disable-gpu --no-sandbox --allow-file-access-from-files --window-size=1600,900 --virtual-time-budget=2500 --screenshot="%OUT%\07_Scene_06_Detective_Conclusion.png" "%DIST%?scene=6"

echo Capturing Scene 7...
%CHROME% --headless=new --disable-gpu --no-sandbox --allow-file-access-from-files --window-size=1600,900 --virtual-time-budget=2500 --screenshot="%OUT%\08_Scene_07_The_Storm.png" "%DIST%?scene=7"

echo Capturing Scene 8...
%CHROME% --headless=new --disable-gpu --no-sandbox --allow-file-access-from-files --window-size=1600,900 --virtual-time-budget=2500 --screenshot="%OUT%\09_Scene_08_What_Remains.png" "%DIST%?scene=8"

echo Capturing Scene 9...
%CHROME% --headless=new --disable-gpu --no-sandbox --allow-file-access-from-files --window-size=1600,900 --virtual-time-budget=2500 --screenshot="%OUT%\10_Scene_09_NASA_Sources_and_Evidence.png" "%DIST%?scene=9"

echo Capturing Scene 10...
%CHROME% --headless=new --disable-gpu --no-sandbox --allow-file-access-from-files --window-size=1600,900 --virtual-time-budget=2500 --screenshot="%OUT%\11_Scene_10_Mission_Completed.png" "%DIST%?scene=10"

echo All captures complete!

