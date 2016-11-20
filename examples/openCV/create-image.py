import cv2
import numpy as np
import sys

def parseFile(fname, p):
	imgsuffixes = set([".jpeg", ".jpg", ".png", ".tif"])
	arr = []

	# create random image
	if fname == "random":
		arr = np.random.randint(256, size=30000)

	# open existing image file
	elif fname[-4:].lower() in imgsuffixes:
		arr = cv2.imread(fname).flatten()

	# open file containing large number and create image array
	else:
		with open(fname) as f:
			arr = f.read().strip()
			arr = [int(arr[i:i+p]) for i in range(0, len(arr), p)]

	return np.asarray(arr)

def incImg(img, i, p):
	return img

def reshapeImg(img, l, w, p):
	# reshape image to (l, w) and add/remove pixels as needed
	while len(img) % p != 0:
		np.append(img, np.random.randint(256))

	olds = img.size / p
	news = l*w
	if news < olds:
		img = img[:p*news]
	elif news > olds:
		img = np.concatenate( (img, np.random.randint(256, size=p*(news-olds))) )

	return img.reshape(l, w, p)

if __name__ == "__main__":
	# Usage: python create-image2.py <height> <width> <filename>
	# open and parse image file or create random image
	# and write reshaped image to img.png

	img = parseFile(sys.argv[1], 3)

	if sys.argv[2] == "--inc":
		i = int(sys.argv[3])
		img = incImg(img, i, sys.argv[3][-1] == '%')

	if sys.argv[4] == "--dim":
		l, w = int(sys.argv[5]), int(sys.argv[6])
		img = reshapeImg(img, l, w, 3)

	cv2.imwrite("img.png", img)

# TEST CASES
#     python create-image.py 300 600 random
#     python create-image.py 21 21 array.txt
#     python create-image.py 63 7 array.txt
#     python create-image.py 175 940 cat.jpg
#     python create-image.py 650 235 cat.jpg
