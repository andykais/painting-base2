import cv2
import numpy as np
import sys

def reshapeImg(img, l, w, p):
	# reshape image to (l, w) and add/remove pixels as needed
	while len(img) % p != 0:
		img = np.append(img, 255)

	olds = img.size / p
	news = l*w
	if news < olds:
		img = img[:p*news]
	elif news > olds:
		img = np.concatenate( (img, np.zeros(p*(news-olds))) )

	return img.reshape(l, w, p)

if __name__ == "__main__":
	# Usage: python create-image2.py <height> <width> <array>
	# for random image do <array> = random
	# array format string = xyz...
	l = int(sys.argv[1])
	w = int(sys.argv[2])
	s = sys.argv[3]

	# create random image if no array given
	if s == "random":
		arr = np.random.randint(256, size=l*w*3)
	else:
		arr = np.asarray([int(s[i:i+3]) for i in range(0, len(s)-3, 3)])

	# write image to new file
	cv2.imwrite("img.png", reshapeImg(arr, l, w, 3))
