### My Favourite AWS Course

## Some instructions

1.	Select the volume, click Actions, and then select Attach Volume. 
2.	When it asks you to select an instance, just pick the instance of your choice. 
3.	When you select the instance and click Attach, the volume will be shown as in-use
4.	Once again, select Instance-1 from Instances and click Connect
5.	Your Amazon login will have the username ec2-user and will display the instance-id and IP address of the instance
6.	Click on Connect
7.	The first thing you will see after you log in is a black window with your username as ec2-user.
8.	Now we’ll use some Linux commands here and you should enter the commands carefully because Linux is case-sensitive.
9.	Type “lsblk“(press enter) and you will get “xvdf” as the disk name.
10.	To mount it, we must first access it
11.	Type sudo file -s /dev/xvdf (press enter)
12.	This output will give us data that means there is no file system on the device and we have to create one. So, for this, we will use another command
13.	Type sudo mkfs -t ext4 /dev/xvdf (press enter) (ext4 is for formatting)
14.	Type sudo mkdir /data (press enter)
15.	“data folder is created” and it will show as “xvdf/data”
16.	Now to mount it
17.	Type sudo mount /dev/xvdf /data (press enter) 
18.	To confirm type “lsblk” and press enter and you will see “xvdf” is mounted to the data folder.
19.	Go to data folder by typing “cd /data“
20.	Now we will make a file
21.	Type sudo touch Hello.txt (press enter)
22.	To confirm it is created or not type “sudo ls“
23.	Now to edit that file type we will use VI editor here
24.	Type sudo vi Hello.txt (press enter)
25.	Editing mode is enabled now, Press “i” for inserting the command and {move your cursor below the UUID path given there}
26.	Type “hello world” and press escape (ESc key) and then type ” :w ” (press enter) and then type ” :q! ” (press enter and you will be out of the editor)
27.	To check if hello world is there
28.	Type cat Hello.txt (press enter) output will show “hello world” 
29.	Now we will add entry and mount our file to the specified mount point
30.	Type sudo vi  /etc/fstab
31.	Again press “i” for insert mode and {move your cursor below the UUID path given there}
32.	Type /dev/xvdf /data ext4 defaults,nofail  0  2 {remember there is double space after nofail and also after 0} (press enter)
33.	Press escape (ESc Key) and then type ” :w ” (press enter) then type ” :q! ” (press enter and you will be out of the editor)
34.	So to check if mounted or not  Type cat /etc/fstab (press enter) output will show it is mounted
35.	To verify the file system is formatted or not
36.	Type sudo file -s /dev/xvdf
37.	Now to unmount the data firstly come out of the folder by using cd ../
38.	Type sudo umount /data (remember command is “umount” not unmount)
39.	To confirm type “lsblk” and you will see that it is unmounted
40.	Now we will test our fstab file
41.	Type sudo mount -a (press enter)
42.	To confirm type “lsblk” and press enter and output will show that data has become the specified mount point



#### Please delete your resources after validating and performing this lab.
