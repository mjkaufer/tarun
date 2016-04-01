#!usr/bin/env python  
#coding=utf-8  

import pyaudio  
import wave  

#define stream chunk   
chunk = 1024  

#open a wav format music  
#instantiate PyAudio  
p = pyaudio.PyAudio()
#open stream


filenames = ['ta','aa','ru','uu','un'];

maxIndex = len(filenames)


def playSound(i):
	f = wave.open(r"./noises/"+filenames[i]+".wav","rb")  

	if i > len(filenames):
		return

	stream = p.open(format = p.get_format_from_width(f.getsampwidth()),  
        channels = f.getnchannels(),  
        rate = f.getframerate(),  
        output = True)  

	#read data  
	data = f.readframes(chunk)  

	#paly stream  
	while data != '':  
	    stream.write(data)  
	    data = f.readframes(chunk)  

	#stop stream  
	stream.stop_stream()  
	stream.close()
	playSound(i+1)


playSound(0)




#close PyAudio  
p.terminate() 