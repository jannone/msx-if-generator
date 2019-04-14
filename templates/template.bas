DEFINTA-Z:COLOR 15,1,1:SCREEN 2,,0
DIM O$(10), OO(10), OY(10)
AR=1:V$=""
OPEN "GRP:" FOR OUTPUT AS #1
$label_mainloop:
  GOSUB $label_setupNode
  GOSUB $label_showText
  GOSUB $label_showOptions
$label_keyloop:
  I$=INKEY$:IF I$="" THEN $label_keyloop
  AO=VAL(I$)
  IF AO<=0 OR AO>OC THEN $label_keyloop
  GOSUB $label_handleInput
  GOTO $label_mainloop

$label_print:
  LN=LEN(T$)
  FOR I=1 TO LN
  C$=MID$(T$,I,1):IF C$="|" THEN TX=0:TY=TY+1:NEXT
  PRESET(136+TX*6,TY*12),1:PRINT #1,C$;:TX=TX+1
  REM IF TX>=20 THEN TX=0:TY=TY+1
  NEXT
  RETURN

$label_showOptions:
  IF OC=0 THEN RETURN
  TY=TY+2
  FOR OI=1 TO OC
  OY(OI)=TY
  TX=0: COLOR 7: T$=CHR$(ASC("0") + OI):GOSUB $label_print
  TX=2: COLOR 15: T$=O$(OI):GOSUB $label_print
  TY=TY+1
  NEXT
  RETURN

$label_showText:
  IF S$="" THEN LINE(0,0)-(255,191),1,BF:GOTO $label_showText_2
  IF V$<>S$ THEN BLOAD S$,S:V$=S$ ELSE LINE(128,0)-(255,191),1,BF
$label_showText_2:
  TX=0:TY=0
  IF P$<>"" THEN T$=P$:P$=""
  GOSUB $label_print
  RETURN

$label_handleInput:
  Y=OY(AO)*12
  LINE(132,Y)-(133,Y+7),8,BF
  GOSUB $label_handleOptions
  RETURN
