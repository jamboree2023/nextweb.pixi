from tqdm import tqdm
from time import sleep
import psutil

with tqdm(total=100, desc='cpu1%', position=0) as cpubar,tqdm(total=100, desc='cpu2%', position=1) as cpubar1,tqdm(total=100, desc='cpu3%', position=2) as cpubar2,tqdm(total=100, desc='cpu4%', position=3) as cpubar3, tqdm(total=100, desc='ram%', position=4) as rambar:
    while True:
        rambar.n=psutil.virtual_memory().percent
        values=psutil.cpu_percent(percpu=True)
        cpubar.n=values[0]
        cpubar1.n=values[1]
        cpubar2.n=values[2]
        cpubar2.n=values[3]
        rambar.refresh()
        cpubar1.refresh()
        cpubar2.refresh()
        cpubar3.refresh()
        cpubar.refresh()
        sleep(0.5)
