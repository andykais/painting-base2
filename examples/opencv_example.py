#OpenCV package
import cv2
import numpy as np
#Plotting package to see the pretty pictures
import matplotlib.pyplot as plt

'''
Function to add a box of a solid color on to an image
Take a height by width by 3 array
Returns an array of the same shape
'''
def add_a_box(image):
    '''
    The shape of an image is what it sounds like
    for an image shape[0] is heigh, shape[1] is width, shape[2] is the color space
    '''
    dim1 = image.shape[0]
    dim2 = image.shape[1]
    color = np.random.randint(256,size=3) #random color
    #we will place the box randomly for fun
    top_y = np.random.randint(dim1)
    bottom_y = np.random.randint(low=top_y, high=dim1)
    left_x = np.random.randint(dim2)
    right_x = np.random.randint(low=left_x, high=dim2)
    #Here a square from the top left to the bottom right is being set to color
    image[top_y:bottom_y,left_x:right_x] = color
    return image

def show_image(image):
    plt.imshow(image)
    plt.axis('off')
    plt.show()
#Generating a random 'image' will look like noise
'''
The following line creates an array of arrays of arrays
aka shape 150px tall, 300px wide and 3 colors(RGB)
The 256 says that I want numbers between 0 and 255
'''
random_image = np.random.randint(256,size=(150,300,3))

#Here we will just show what our random image looks like
show_image(random_image)

random_image = add_a_box(random_image)
show_image(random_image)

#Flatten out array
flat_array = random_image.flatten()
print flat_array

#Showing that we can take a flat array and turn it back into the original image
fix_again = flat_array.reshape(random_image.shape[0], random_image.shape[1], random_image.shape[2])
show_image(fix_again)
