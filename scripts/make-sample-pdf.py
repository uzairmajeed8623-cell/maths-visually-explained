from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont("Body", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("Heading", "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"))
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from pathlib import Path
out=Path(__file__).resolve().parents[1]/'public/resources/pythagoras-practice.pdf'
c=canvas.Canvas(str(out),pagesize=A4); w,h=A4
ink=HexColor('#172033'); green=HexColor('#29483D'); grey=HexColor('#677064')
def header(label,title):
 c.setFillColor(green);c.setFont('Body',10);c.drawString(48,h-48,'MATHS, VISUALLY EXPLAINED  /  GCSE & IGCSE')
 c.setFillColor(ink);c.setFont('Heading',25);c.drawString(48,h-98,title)
 c.setFont('Body',10);c.setFillColor(grey);c.drawString(48,h-122,label)
 c.setStrokeColor(HexColor('#D8D8CD'));c.line(48,h-140,w-48,h-140)
def footer(n):
 c.setFont('Body',9);c.setFillColor(grey);c.drawString(48,35,'Independent practice | Original sample questions, not an exam-board paper');c.drawRightString(w-48,35,str(n))
header('FREE PRACTICE SHEET  /  Show your working. Give units.','Pythagoras: see the connection')
c.setFont('Body',11);c.setFillColor(ink)
c.drawString(48,h-166,'For a right-angled triangle: a squared + b squared = c squared.')
c.drawString(48,h-184,'c is the hypotenuse, opposite the right angle.')
qs=[('1','The shorter sides of a right-angled triangle are 6 cm and 8 cm.','Find the hypotenuse.'),('2','The hypotenuse is 13 cm. One shorter side is 5 cm.','Find the other shorter side.'),('3','A rectangle is 9 m long and 12 m wide.','Find the length of its diagonal.'),('4','A ladder is 10 m long. Its base is 6 m from a vertical wall.','How far up the wall does it reach? Assume level ground.'),('5','A triangle has sides of 7 cm, 8 cm and 11 cm.','Is it right-angled? Explain using a calculation.')]
y=h-225
for n,q1,q2 in qs:
 c.setFillColor(green);c.setFont('Bold',11);c.drawString(48,y,n+'.')
 c.setFillColor(ink);c.setFont('Body',11);c.drawString(70,y,q1);c.drawString(70,y-17,q2)
 c.setStrokeColor(HexColor('#D8D8CD'));c.line(70,y-48,w-48,y-48);c.line(70,y-70,w-48,y-70);y-=100
footer(1);c.showPage()
header('ANSWERS & REASONING  /  Check the method as well as the result.','Make every step make sense')
answers=[('1. The hypotenuse is 10 cm.','6 squared + 8 squared = 36 + 64 = 100. The square root of 100 is 10.'),('2. The missing side is 12 cm.','13 squared - 5 squared = 169 - 25 = 144. The square root of 144 is 12.'),('3. The diagonal is 15 m.','9 squared + 12 squared = 81 + 144 = 225. The square root of 225 is 15.'),('4. The ladder reaches 8 m up the wall.','10 squared - 6 squared = 100 - 36 = 64. The square root of 64 is 8.'),('5. No, the triangle is not right-angled.','7 squared + 8 squared = 113, but 11 squared = 121. They are not equal.')]
y=h-177
for title,body in answers:
 c.setFillColor(green);c.setFont('Heading',17);c.drawString(48,y,title)
 c.setFillColor(ink);c.setFont('Body',9);c.drawString(48,y-25,body);y-=88
c.setFont('Heading',19);c.drawString(48,y-20,'A useful check')
c.setFont('Body',11);c.drawString(48,y-48,'The hypotenuse must be the longest side. If your answer makes a')
c.drawString(48,y-65,'shorter side longer than the hypotenuse, revisit your calculation.')
footer(2);c.save();print(out)
