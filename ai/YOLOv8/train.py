from ultralytics import YOLO
import os

os.environ['KMP_DUPLICATE_LIB_OK']='True'

# Load a model
model = YOLO('yolov8s.yaml')  # build a new model from YAML
model = YOLO('yolov8s.pt')  # load a pretrained model (recommended for training)
model = YOLO('yolov8s.yaml').load('yolov8s.pt')  # build from YAML and transfer weights

if __name__ == '__main__':
    # Train the model
    results = model.train(data='./dog.v4i.yolov8/data.yaml', epochs=100, imgsz=640, device=0)
