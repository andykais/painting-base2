import cv2
import numpy as np
import sys

def parseFlags(flags):
	# parse command line input flags
	l, w = 100, 100
	ifname = None
	ofname = "img.png"

	# parse all flags
	for f in flags.split('-'):
		f = f.strip().split(' ')
		if f[0] and len(f) < 2:
			print "Warning: expected arguments in input: -"+f[0]
			continue
		if f[0] == 'i':
			ifname = f[1]
		elif f[0] == 'o':
			ofname = f[1]
		elif f[0] == 'd':
			l, w = max(int(f[1]), 1), max(int(f[2]), 1)
	return l, w, ifname, ofname

def parseFile(fname, p):
	# open existing image file
	imgsuffixes = set([".jpeg", ".jpg", ".png", ".tif"])
	if fname[-4:].lower() in imgsuffixes:
		return cv2.imread(ifname).flatten()

	# open file containing large number and create image array
	with open(fname) as f:
		arr = []
		num = f.read().strip()

		###############################
		# INSERT BETTER ALGORITHM HERE
		for i in range(0, len(num), p):
			arr.append(int(num[i:i+p]))
		###############################

		while len(arr) % p != 0:
			arr.append(255)
		return np.asarray(arr)

def reshapeImg(img, l, w, p):
	# reshape image to (l, w) and add/remove pixels as needed
	olds = img.size / p
	news = l*w
	if news < olds:
		img = img[:p*news]
	elif news > olds:
		img = np.concatenate( (img, np.zeros(p*(news-olds))) )
	return img.reshape(l, w, p)

if __name__ == "__main__":
	# command line input
	#    -i <fname>				open existing numerical or image file
	#    -o <fname>				output filename (else use img.png)
	#    -d <x> <y>				dimensions of image
	l, w, ifname, ofname = parseFlags((' ').join(sys.argv[1:]))

	# open and parse image file or create random image
	if ifname:
		img = parseFile(ifname, 3)
	else:
		img = np.random.randint(256, size=l*w*3)

	# write image to new file
	cv2.imwrite(ofname, reshapeImg(img, l, w, 3))

# TEST CASES
#     python create-image.py -d 300 600
#     python create-image.py -i array.txt -d 21 21
#     python create-image.py -i array.txt -d 63 7
#     python create-image.py -i cat.jpg -d 175 940
#     python create-image.py -i cat.jpg -d 650 235 -o test.png
