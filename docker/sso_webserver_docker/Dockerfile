FROM  centos:latest
RUN yum -y install httpd
COPY index.html /var/www/html/
COPY osu-shib.css /var/www/html/
COPY logo.svg /var/www/html/
COPY background_sm.jpg /var/www/html/
COPY treeline.png /var/www/html/
CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]
EXPOSE 80