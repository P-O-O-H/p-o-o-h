FROM centos:latest
RUN yum -y install httpd
COPY oregonstate.edu /var/www/html/
CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]
EXPOSE 80